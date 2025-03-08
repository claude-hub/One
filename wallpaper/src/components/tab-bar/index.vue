<template>
  <view class="fixed bottom-0 left-0 right-0 pb-safe px-8">
    <!-- <view class="h-12 flex-center rounded-full bg-green-100/60 dark:bg-black/30 backdrop-blur-lg"> -->
    <view
      class="tabbar h-12 flex-center rounded-full bg-green-100/60 dark:bg-white/22 backdrop-blur-md"
    >
      <view
        v-for="(item, index) in TABBAR"
        :key="index"
        class="flex-1 flex flex-col items-center justify-center text-center"
        @click="switchTab(item.pagePath)"
      >
        <image
          :src="getIconPath(item, currentPath)"
          class="w-7 h-7"
          :class="{ 'scale-110': currentPath === item.pagePath }"
          mode="aspectFit"
        />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { TABBAR } from '@/utils'
import { ref } from 'vue'

const currentPath = ref('')

// 获取当前页面路径
const getCurrentPath = () => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return '/' + currentPage.route
}

// 切换页面
const switchTab = (path: string) => {
  if (path === currentPath.value) return
  uni.switchTab({ url: path })
}

// 获取图标路径
const getIconPath = (item: any, currPath: string) => {
  return currPath === item.pagePath ? item.selectedIconPath : item.iconPath
}

// 监听页面显示
onShow(() => {
  currentPath.value = getCurrentPath()
})
</script>
