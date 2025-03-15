<template>
  <div
    class="bg-page flex-y dark:bg-black/80 pb-2"
    :style="{ paddingTop: statusBarHeight + 'px', height: getTitleBarHeight() + 'px' }"
  >
    <div class="flex-y px-4 gap-10">
      <navigator url="/pages/index/index" open-type="switchTab">
        <wd-img :width="32" :height="32" class="w-8 h-8" src="/static/logo.svg" mode="aspectFit" />
      </navigator>

      <!-- <div class="mx-4">
        <navigator url="/pages/search/index" open-type="switchTab">
          <div
            class="nav-search h-8 flex-center px-3 rounded-full w-20 border border-solid border-black/10 dark:(border-translate bg-white/9.4)"
          >
            <wd-input
              disabled
              prefix-icon="search"
              inputmode="none"
              placeholder="搜索"
              size="small"
              :no-border="true"
            />
          </div>
        </navigator>
      </div> -->
      <theme-switch />
    </div>
  </div>
</template>

<script lang="ts" setup>
import themeSwitch from '@/components/theme-switch/index.vue'
import { getStatusBarHeight, getTitleBarHeight } from '@/utils'

const statusBarHeight = getStatusBarHeight()
</script>

<style lang="scss" scoped>
:deep(.nav-search) {
  --wot-input-bg: transparent;
}
</style>
