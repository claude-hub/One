<template>
  <view class="tab-bar h-[3.125rem] pb-safe px-8">
    <view class="content h-full center rounded-full">
      <view
        v-for="(item, index) in list"
        :key="index"
        class="flex-1 flex flex-col items-center justify-center text-center"
        @click="switchTab(item.pagePath)"
      >
        <image :src="getIconPath(item, currentPath)" class="w-8 h-8" mode="aspectFit" />
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
    selectedIconPath: '/static/tabbar/homeHL.png',
    pagePath: '/pages/index/index',
    text: '首页1',
  },
  {
    iconPath: '/static/tabbar/example.png',
    selectedIconPath: '/static/tabbar/exampleHL.png',
    pagePath: '/pages/user/index',
    text: '我的2',
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
<style lang="scss" scoped>
.tab-bar {
  @apply fixed bottom-0 left-0 right-0;

  .content {
    background-color: #4c4c4c;
    backdrop-filter: blur(10px);
  }
}
</style>
