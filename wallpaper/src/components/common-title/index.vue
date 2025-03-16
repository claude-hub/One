<template>
  <div class="flex-between items-start py-6">
    <div>
      <div class="text-2xl font-medium title">{{ nav.name }}</div>
      <div v-if="nav.desc" class="text-sm">{{ nav.desc }}</div>
    </div>
    <div
      v-if="nav.type"
      class="text-xs bg-gray-100 dark:bg-white/14.5 text-gray-500 rounded-8 pl-2 pr-1 py-1 uppercase"
      @click="gotoPage(nav.type)"
    >
      <div class="flex-center gap-1">
        <div>more</div>
        <wd-icon name="chevron-right" size="16px"></wd-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCategoriesStore } from '@/store'
import type { NavigationTitle } from '@/types'

const categoriesStore = useCategoriesStore()
const gotoPage = (type: string) => {
  categoriesStore.setType(type)
  uni.switchTab({
    url: `/pages/category/index`,
  })
}

defineProps<{
  nav: NavigationTitle
}>()
</script>
