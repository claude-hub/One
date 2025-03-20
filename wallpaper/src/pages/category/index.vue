<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '分类',
  },
}
</route>

<template>
  <div v-for="category in categories">
    <div class="text-xl">{{ category.name }}</div>
    <div class="grid grid-cols-2 gap-2 my-4">
      <div
        class="relative"
        v-for="child in category.children"
        :key="child.name"
        @click="goToDetail(child.path)"
      >
        <my-img :height="120" width="100%" mode="aspectFill" :src="child.logo" :radius="8"></my-img>
        <div
          class="absolute bottom-0 left-0 right-0 py-1.5 px-2 text-center bg-white/50 dark:(bg-black/50) backdrop-blur-lg rounded-b-2 text-xs"
          v-if="child.name"
        >
          <div class="truncate">{{ child.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCategoryData } from '@/service'
import { useCategoriesStore } from '@/store'
import { goToDetail } from '@/utils'
import { onLoad } from '@dcloudio/uni-app'

const categoriesStore = useCategoriesStore()
const categories = ref([])

watch(
  () => categoriesStore.type,
  (newValue) => {
    if (newValue) {
      console.log('====', newValue)
    }
  },
)
const init = async () => {
  try {
    uni.showLoading({ title: '加载中...', mask: true })
    const { data } = await getCategoryData()
    console.log(data)
    if (!data.length) return
    categories.value = data
  } catch (error) {
    uni.showToast({
      title: '获取分类失败',
      icon: 'none',
    })
  } finally {
    uni.hideLoading()
  }
}

onLoad(() => {
  init()
})
</script>
