<template>
  <div :class="{ dark: isDark }">
    <div class="flex flex-col min-h-screen bg-bg-100 text-text-100">
      <div class="sticky top-0 left-0 right-0 z-10 w-full">
        <nav-bar />
      </div>

      <div class="flex-1 bg-page flex flex-col" :style="style">
        <div class="py-2 px-3 flex-1 flex flex-col"><slot /></div>
      </div>
      <tab-bar />
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '@/components/nav-bar/index.vue'
import TabBar from '@/components/tab-bar/index.vue'
import { getNavBarHeight } from '@/utils'

import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

const { safeAreaInsets } = uni.getWindowInfo()
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
