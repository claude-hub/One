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
    <div
      class="absolute top-30 left-0 right-0 text-center z-12"
      :class="{ 'text-white': fullSrc.includes('手机') }"
    >
      <div class="text-4xl font-medium">{{ currentTime }}</div>
      <div class="text-2xl mt-1">{{ currentDate }}</div>
    </div>
    <my-img
      v-if="fullSrc.includes('手机')"
      width="100%"
      height="100vh"
      :src="fullSrc"
      mode="scaleToFill"
    />

    <div class="flex-center img-wrapper" v-else>
      <my-img class="w-full" width="100%" height="auto" :src="fullSrc" mode="widthFix" />
    </div>

    <div class="fixed bottom-0 left-0 right-0 flex-center gap-4 py-4 pb-safe">
      <wd-button @click="goBack" plain>返回</wd-button>
      <wd-button @click="saveImage" type="success" plain>保存图片</wd-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useConfigStore } from '@/store'
import { loading } from '@/utils'
import { onLoad } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const globalStore = useConfigStore()
const { imgPrefix } = storeToRefs(globalStore)

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

const fullSrc = computed(() => {
  // 直接获取 imgPrefix 的值而不是响应式对象
  const cdnPrefix = imgPrefix.value || ''
  return url.value.startsWith('http') || url.value.startsWith('data:')
    ? url.value
    : cdnPrefix + url.value
})

const goBack = () => {
  uni.navigateBack()
}

const saveImage = () => {
  loading.show('保存中...')

  uni.downloadFile({
    url: fullSrc.value,
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

<style lang="scss" scoped>
.img-wrapper {
  min-height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
}
</style>
