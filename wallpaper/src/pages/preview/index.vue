<route lang="json5" type="page">
{
  layout: 'none',
  style: {
    navigationBarTitleText: '预览',
  },
}
</route>

<template>
  <div class="relative pb-safe">
    <div class="absolute top-30 left-0 right-0 text-center text-white">
      <div class="text-3xl font-medium">{{ currentTime }}</div>
      <div class="text-lg mt-1">{{ currentDate }}</div>
    </div>
    <image class="w-screen h-screen" :src="url" mode="scaleToFill" />
    <div class="flex-center gap-4 my-4">
      <wd-button @click="goBack" plain>返回</wd-button>
      <wd-button @click="saveImage" type="success" plain>保存图片</wd-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { loading } from '@/utils'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const url = ref('')

const now = new Date()
const currentTime = ref(
  now.toLocaleTimeString('zh-CN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }),
)
const currentDate = ref(
  now.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
  }),
)

onLoad((option) => {
  url.value = option.url || ''
})

const goBack = () => {
  uni.navigateBack()
}

const saveImage = () => {
  loading.show('保存中...')

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
              icon: 'none',
            })
          },
        })
      }
    },
    complete: () => {
      loading.hide()
    },
  })
}
</script>
