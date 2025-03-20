/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const basePath = path.resolve(__dirname, '../public/wallpaper');

const output = path.resolve(__dirname, '../public/data/categories');
const relativePath = '/data/categories/';

// 递归获取所有文件和文件夹
const getAllFiles = async (dirPath) => {
  try {
    const items = await fs.readdirSync(dirPath);
    const result = [];

    // 使用 Promise.all 并行处理所有文件和文件夹
    await Promise.all(
      items.map(async (item) => {
        const fullPath = path.join(dirPath, item);
        const stat = await fs.statSync(fullPath);

        // 跳过 .DS_Store 文件
        if (item === '.DS_Store') {
          return;
        }

        if (stat.isDirectory()) {
          // 如果是文件夹，递归获取其中的内容
          const children = await getAllFiles(fullPath);
          if (children.length > 0) {
            result.push({
              name: item,
              children
            });
          }
        } else {
          // 计算相对于 basePath 的路径
          result.push({
            name: path.join('/', path.relative(basePath, fullPath)),
            size: stat.size
          });
        }
      })
    );

    const categories = ['手机分类', '电脑平板', '头像分类'];

    // 根据预定义的categories数组顺序对结果进行排序
    return result.sort((a, b) => {
      const aIndex = categories.indexOf(a.name);
      const bIndex = categories.indexOf(b.name);
      return aIndex - bIndex;
    });
  } catch (error) {
    console.error(`获取文件列表时出错: ${error.message}`);
    return [];
  }
};

// 递归获取所有图片文件
const getAllImages = (files) => {
  const images = [];

  const traverse = (items) => {
    items.forEach((item) => {
      if (item.children) {
        traverse(item.children);
      } else if (item.name) {
        // 检查是否为图片文件
        const ext = path.extname(item.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          images.push(item.name);
        }
      }
    });
  };

  traverse(files);
  return images;
};

const genLatest = async () => {
  const mobileFiles = await getAllFiles(path.join(basePath, '手机分类'));
  const mobileImages = await getAllImages(mobileFiles);
  // 按照时间顺序排序
  const latest = mobileImages.sort((a, b) => {
    const dateA = new Date(a.split('/').pop());
    const dateB = new Date(b.split('/').pop());
    return dateA - dateB;
  });
  // 把数据分割成 15 个数据一个文件，并写入文件
  const chunks = latest.reduce((acc, cur, index) => {
    if (index % 20 === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(cur);
    return acc;
  }, []);

  const folderPath = path.join(output, `latest`);
  for (let i = 0; i < chunks.length; i++) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    await fs.writeFileSync(
      path.join(folderPath, `${i + 1}.json`),
      JSON.stringify(
        {
          code: 200,
          msg: 'success',
          data: chunks[i]
        },
        null,
        2
      )
    );
  }

  // 还需要生成一个 index.json 文件，用于引用 上一步生成的 json文件
  await fs.writeFileSync(
    path.join(folderPath, `index.json`),
    JSON.stringify(
      {
        code: 200,
        msg: 'success',
        data: new Array(chunks.length)
          .fill(0)
          .map((_, i) => `/data/categories/latest/${i + 1}.json`)
      },
      null,
      2
    )
  );
};

const main = async () => {
  try {
    await genLatest();
    const allFiles = await getAllFiles(basePath);

    const findLastChildName = (obj) => {
      if (!obj?.children?.length) return null;
      let current = obj;
      while (current.children?.[0]?.children?.length) {
        current = current.children[0];
      }
      return current.children?.[0]?.name;
    };

    const categories = allFiles.map(({ name, children }) => ({
      name: name.split('-').pop(),
      children: children.map((child) => {
        const { name: childName, children: childChildren } = child;

        return {
          name: childName.split('-').pop(),
          logo: childChildren?.length
            ? findLastChildName(child) || childChildren[0].name
            : child[0]?.name,
          path: path.join(relativePath, name, childName, 'index.json')
        };
      })
    }));

    await fs.mkdirSync(path.join(output), { recursive: true });
    allFiles.forEach(async ({ name, children }) => {
      const catName = path.join(output, name);

      await fs.mkdirSync(catName, { recursive: true });
      children.forEach(async ({ name, children: secChildren }) => {
        const items = {
          name: name,
          tags: [],
          images: []
        };

        const detailPath = path.join(catName, name);
        await fs.mkdirSync(detailPath, { recursive: true });

        secChildren.forEach(async ({ name, children: thirdChildren }) => {
          if (thirdChildren?.length) {
            items.tags.push(name);
            items.images.push(...thirdChildren.map(({ name }) => name));

            await fs.writeFileSync(
              path.join(detailPath, `${name}.json`),
              JSON.stringify(
                {
                  code: 200,
                  msg: 'success',
                  data: {
                    name,
                    images: thirdChildren.map(({ name }) => name)
                  }
                },
                null,
                2
              )
            );
          } else {
            items.images.push(name);
          }
        });

        await fs.writeFileSync(
          path.join(catName, name, 'index.json'),
          JSON.stringify(
            {
              code: 200,
              msg: 'success',
              data: items
            },
            null,
            2
          )
        );
      });
    });

    fs.writeFileSync(
      path.join(output, 'index.json'),
      JSON.stringify(
        {
          code: 200,
          msg: 'success',
          data: categories
        },
        null,
        2
      )
    );
  } catch (error) {
    console.error(`主程序执行出错: ${error.message}`);
  }
};

main();
