<template>
  <view class="fixed bottom-0 left-0 right-0 pb-safe px-8">
    <view class="h-12 center rounded-full bg-green-100/60 dark:bg-black/30 backdrop-blur-lg">
      <view
        v-for="(item, index) in list"
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
import { ref } from 'vue'

const currentPath = ref('')

// 获取当前页面路径
const getCurrentPath = () => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  return '/' + currentPage.route
}

// tabBar 配置
const list = [
  {
    iconPath: '/static/tabbar/home.png',
    selectedIconPath: '/static/tabbar/home-h.png',
    pagePath: '/pages/index/index',
    text: '首页',
  },
  {
    iconPath: '/static/tabbar/classify.png',
    selectedIconPath: '/static/tabbar/classify-h.png',
    pagePath: '/pages/classify/index',
    text: '分类',
  },
  {
    iconPath: '/static/tabbar/user.png',
    selectedIconPath: '/static/tabbar/user-h.png',
    pagePath: '/pages/user/index',
    text: '我的',
  },
]

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
