<template>
  <div class="fixed bottom-0 left-0 right-0 pb-safe px-8">
    <!-- <div class="h-12 flex-center rounded-full bg-green-100/60 dark:bg-black/30 backdrop-blur-lg"> -->
    <div
      class="tabbar h-12 flex-center rounded-full bg-green-100/60 dark:bg-white/22 backdrop-blur-md"
    >
      <div
        v-for="(item, index) in TABBAR"
        :key="index"
        class="flex-1 flex flex-col items-center justify-center text-center"
        @click="switchTab(item.pagePath)"
      >
        <image
          :src="getIconPath(item, currentPath)"
          class="w-7 h-7"
          :class="{ 'scale-115': currentPath === item.pagePath }"
          mode="aspectFit"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { currRoute, TABBAR } from '@/utils'
import { ref } from 'vue'

const currentPath = ref('')

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
  const { path } = currRoute()
  currentPath.value = path
})
</script>
