<template>
  <view class="flex flex-col h-screen bg-bg-100 text-text-100">
    <nav-bar />
    <view class="bg-page flex-1 overflow-y-auto" :style="{ paddingTop: navBarHeight + 'px' }">
      <slot />
    </view>
    <tab-bar />
  </view>
</template>

<script lang="ts" setup>
import NavBar from '@/components/nav-bar/index.vue'
import TabBar from '@/components/tab-bar/index.vue'
import { getNavBarHeight } from '@/utils'

const navBarHeight = getNavBarHeight()
</script>
