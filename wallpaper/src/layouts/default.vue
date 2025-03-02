<template>
  <view :class="{ dark: isDark }">
    <view class="flex flex-col h-screen bg-bg-100 text-text-100">
      <nav-bar />
      <view
        class="bg-page flex-1 overflow-y-auto"
        :style="{ paddingTop: navBarHeight + 'px', marginTop: -navBarHeight + 'px', paddingBottom }"
      >
        <slot />
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

const paddingBottom = `${bottom + 58}px`

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const navBarHeight = getNavBarHeight()
</script>
