<template>
  <div class="flex-between items-start py-6">
    <div>
      <div class="text-2xl font-medium title">{{ nav.name }}</div>
      <div class="text-sm">{{ nav.desc }}</div>
    </div>
    <navigator
      :url="nav.path"
      :open-type="nav.pathType"
      class="text-xs bg-gray-100 dark:bg-white/14.5 text-gray-500 rounded-8 pl-2 pr-1 py-1 uppercase"
    >
      <div class="flex-center gap-1">
        <div>more</div>
        <wd-icon name="chevron-right" size="16px"></wd-icon>
      </div>
    </navigator>
  </div>
</template>

<script lang="ts" setup>
import type { NavigationTitle } from '@/types' // 根据实际路径调整

defineProps<{
  nav: NavigationTitle
}>()
</script>
