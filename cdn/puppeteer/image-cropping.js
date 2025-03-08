/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs').promises
const path = require('path')
const sharp = require('sharp')

// 输入文件夹路径
const inputDir = '/Users/claude/Documents/Code/cloud-img/wallpaper'
// 输出文件夹路径
const outputDir = './out'

// 目标裁剪尺寸
const targetWidth = 180 // 目标宽度
const targetHeight = 390 // 目标高度

async function processDirectory(inputPath, outputPath) {
  try {
    // 确保输出文件夹存在
    await fs.mkdir(outputPath, { recursive: true })

    // 读取当前文件夹中的所有文件和子文件夹
    const entries = await fs.readdir(inputPath, { withFileTypes: true })

    for (const entry of entries) {
      const entryPath = path.join(inputPath, entry.name)
      // 修改输出文件的扩展名为.webp
      const outEntryPath = path.join(outputPath, `${path.parse(entry.name).name}.webp`)

      if (entry.isDirectory()) {
        // 递归处理子文件夹
        await processDirectory(entryPath, outEntryPath)
      } else if (entry.isFile() && isImageFile(entry.name)) {
        // 处理图片文件
        await resizeImage(entryPath, outEntryPath)
      }
    }
  } catch (error) {
    console.error(`处理文件夹 ${inputPath} 时发生错误:`, error)
  }
}

function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp']
  const ext = path.extname(filename).toLowerCase()
  return imageExtensions.includes(ext)
}

async function resizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize({
        width: targetWidth,
        height: targetHeight,
        fit: 'cover',
        position: 'bottom',
      })
      .webp({ quality: 75 }) // 将输出格式改为webp
      .toFile(outputPath)

    console.log(`图片已裁剪至 ${targetWidth}x${targetHeight}px，保存在 ${outputPath}`)
  } catch (error) {
    console.error('图片处理失败:', error)
  }
}

const main = async () => {
  // 批量处理
  await processDirectory(inputDir, outputDir)
}

main()
