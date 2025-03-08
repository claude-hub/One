<template>
  <div @click="themeStore.toggleTheme">
    <div class="i-carbon-sun dark:i-carbon-moon text-2xl bg-gray-500 dark:bg-white/50"></div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
</script>
