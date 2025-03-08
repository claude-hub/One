/* eslint-disable @typescript-eslint/no-require-imports */

const cheerio = require('cheerio');
const host = 'https://github.com';
const fs = require('fs');
const path = require('path');
const baseUrl = '/claude-hub/cloud-img/tree/main/wallpaper';
const imgBaseUrl = '/claude-hub/cloud-img/blob/main/wallpaper';
const cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper';
const baseFolder = path.resolve('../public/data');

// 判断字符串是图片
const isImage = (url) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'];
  const ext = url.split('.').pop().toLowerCase();
  return imageExtensions.includes(`.${ext}`);
};

// 抓取 GitHub 页面数据
async function fetchGitHubData(url = '') {
  try {
    const response = await fetch(host + baseUrl + url);
    const data = await response.text();
    const $ = cheerio.load(data);

    // 解析页面内容
    const images = [];
    $(
      '.react-directory-row .react-directory-row-name-cell-large-screen .react-directory-filename-cell a'
    ).each(async (i, element) => {
      const href = $(element).attr('href');

      if (isImage(href)) {
        const url = href.replace(imgBaseUrl, '');
        images.push(cdnBaseUrl + decodeURIComponent(url));
      } else {
        const url = href.replace(baseUrl, '');
        await fetchGitHubData(url);
      }
    });

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

    return images;
  } catch (error) {
    console.error('抓取数据失败:', error);
    return [];
  }
}

fetchGitHubData();
