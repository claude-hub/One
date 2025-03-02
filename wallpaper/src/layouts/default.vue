<template>
  <view :class="{ dark: isDark }">
    <view class="flex flex-col min-h-screen bg-bg-100 text-text-100">
      <view class="sticky top-0 left-0 right-0 z-10 w-full">
        <nav-bar />
      </view>

      <view class="flex-1 bg-page" :style="style">
        <view class="py-2 px-3"><slot /></view>
      </view>
      <tab-bar />
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavBar from '@/components/nav-bar/index.vue'
import TabBar from '@/components/tab-bar/index.vue'
import { getNavBarHeight } from '@/utils'

import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

const { safeAreaInsets } = uni.getSystemInfoSync()
const { bottom } = safeAreaInsets

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const style = computed(() => {
  // 底部的间距，48为底部tabbar的高度。bottom 为安全区域距离底部的高度。
  const paddingBottom = `${bottom + 48}px`

  // 导航栏的高度，如果是light模式，由于渐变的原因需要加上高度
  const navBarHeight = getNavBarHeight()
  if (isDark.value) {
    return { paddingBottom }
  }
  return { paddingTop: navBarHeight + 'px', marginTop: -navBarHeight + 'px', paddingBottom }
})
</script>
