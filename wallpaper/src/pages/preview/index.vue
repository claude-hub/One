<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '预览',
  },
}
</route>

<template>
  <view class="preview-container">
    <view class="datetime-display">
      <text class="time">{{ currentTime }}</text>
      <text class="date">{{ currentDate }}</text>
    </view>
    <image :src="url" mode="aspectFit" class="preview-image" @tap="previewImage" />
    <view class="action-bar">
      <button class="save-btn" @tap="saveImage">保存图片</button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 定义 id 变量
const url = ref('')
const currentTime = ref('')
const currentDate = ref('')
let timer: number

// 更新时间和日期
const updateDateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', { hour12: false })
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
}

// 页面加载时获取 url 参数
onLoad((option) => {
  url.value = option.url || ''
  updateDateTime()
  // 每秒更新时间
  timer = setInterval(updateDateTime, 1000)
})

// 页面卸载时清除定时器
onUnload(() => {
  clearInterval(timer)
})

// 预览图片
const previewImage = () => {
  uni.previewImage({
    urls: [url.value],
    current: url.value,
  })
}

// 保存图片到相册
const saveImage = () => {
  uni.showLoading({
    title: '保存中...',
  })

  uni.downloadFile({
    url: url.value,
    success: (res) => {
      if (res.statusCode === 200) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            uni.showToast({
              title: '保存成功',
              icon: 'success',
            })
          },
          fail: () => {
            uni.showToast({
              title: '保存失败',
              icon: 'error',
            })
          },
        })
      }
    },
    complete: () => {
      uni.hideLoading()
    },
  })
}
</script>

<style lang="scss" scoped>
.preview-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #000;

  .datetime-display {
    position: absolute;
    top: 40rpx;
    left: 40rpx;
    z-index: 1;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    .time {
      display: block;
      margin-bottom: 10rpx;
      font-size: 60rpx;
      font-weight: bold;
    }

    .date {
      display: block;
      font-size: 28rpx;
    }
  }

  .preview-image {
    flex: 1;
    width: 100%;
  }

  .action-bar {
    padding: 20rpx;
    background: rgba(0, 0, 0, 0.5);

    .save-btn {
      width: 100%;
      height: 80rpx;
      font-size: 28rpx;
      line-height: 80rpx;
      color: #fff;
      text-align: center;
      background: #007aff;
      border-radius: 40rpx;
    }
  }
}
</style>
