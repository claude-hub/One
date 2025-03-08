/* eslint-disable @typescript-eslint/no-require-imports */

const cheerio = require('cheerio');
const host = 'https://github.com';
const fs = require('fs');
const path = require('path');
const baseUrl = '/claude-hub/cloud-img/tree/main/wallpaper';
const imgBaseUrl = '/claude-hub/cloud-img/blob/main/wallpaper';
const cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper';
const baseFolder = path.resolve('../public/data/categories');

// 判断字符串是图片
const isImage = (url) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];
  const ext = url.split('.').pop().toLowerCase();
  return imageExtensions.includes(`.${ext}`);
};

const mobileImages = [];

// 抓取 GitHub 页面数据
const fetchGitHubData = async (url = '') => {
  try {
    const response = await fetch(host + baseUrl + url);
    const data = await response.text();
    const $ = cheerio.load(data);

    // 解析页面内容
    const images = [];

    const elements = $(
      '.react-directory-row .react-directory-row-name-cell-large-screen .react-directory-filename-cell a'
    );

    // 使用 for...of 循环同步处理每个元素
    for (const element of elements) {
      const href = $(element).attr('href');

      if (isImage(href)) {
        const url = decodeURIComponent(href).replace(imgBaseUrl, '');
        const src = cdnBaseUrl + url;
        if (src.includes('手机分类')) {
          mobileImages.push(src);
        }
        images.push(src);
      } else {
        const url = href.replace(baseUrl, '');
        // 同步等待子目录的处理完成
        await fetchGitHubData(url);
      }
    }

    if (images.length) {
      const folders = decodeURIComponent(url).split('/');
      const fileName = folders.pop() || 'base';
      const folder = folders.join('/');
      // 创建文件夹
      const folderPath = path.join(baseFolder, folder);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      fs.writeFileSync(
        path.join(folderPath, `${fileName}.json`),
        JSON.stringify(
          {
            code: 200,
            msg: 'success',
            data: images
          },
          null,
          2
        )
      );
    }
  } catch (error) {
    console.error('抓取数据失败:', error);
  }
};

const main = async () => {
  await fetchGitHubData();

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

  const folderPath = path.join(baseFolder, `latest`);
  for (let i = 0; i < chunks.length; i++) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    fs.writeFileSync(
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
  fs.writeFileSync(
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

main();
