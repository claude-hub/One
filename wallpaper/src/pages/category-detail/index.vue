<route lang="json5" type="page">
{
  layout: 'second',
  style: {
    navigationBarTitleText: '分类详情',
  },
}
</route>

<template>
  <div class="font-medium text-center">{{ detail?.name }}</div>

  <wd-tag mark v-for="tag in detail?.tags">{{ tag }}</wd-tag>

  <div class="mt-6 grid grid-cols-3 gap-3" v-if="detail?.images.length">
    <div v-for="(img, index) in detail.images" :key="index" @click="goPreview(img)">
      <my-img
        lazy-load
        width="100%"
        :height="366"
        mode="aspectFill"
        :src="img"
        :radius="12"
        class="w-full"
      ></my-img>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MyImg from '@/components/my-img/index.vue'
import { getDetails } from '@/service'
import { ImageCollection } from '@/types'
import { goPreview, loading } from '@/utils'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const detail = ref<ImageCollection>()

const init = async (url: string) => {
  try {
    loading.show()
    const { data } = await getDetails(url)
    detail.value = data
  } catch (error) {
    uni.showToast({
      title: '加载失败',
      icon: 'none',
    })
  } finally {
    loading.hide()
  }
}

// 页面加载时获取 url 参数
onLoad((options: { url: string }) => {
  init(options.url)
})
</script>
