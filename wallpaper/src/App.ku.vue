<template>
  <wd-config-provider :theme="themeStore.theme">
    <div :class="themeStore.theme">
      <KuRootView />
    </div>
  </wd-config-provider>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'
const themeStore = useThemeStore()
</script>
