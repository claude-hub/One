<template>
  <view @click="themeStore.toggleTheme">
    <view class="i-carbon-sun dark:i-carbon-moon text-2xl bg-black/70 dark:bg-text-300"></view>
  </view>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
</script>
