<template>
  <view
    class="bg-page flex-y dark:bg-black/80 pb-2"
    :style="{ paddingTop: statusBarHeight + 'px', height: getTitleBarHeight() + 'px' }"
  >
    <view class="flex-y px-4 gap-2">
      <image class="w-8 h-8" src="/static/logo.svg" mode="aspectFit" />
      <view class="mx-4">
        <navigator url="/pages/search/index">
          <view
            class="flex items-center rounded-full px-3 h-8 border border-solid border-black/20 dark:(border-white/10 bg-[#181818])"
          >
            <wd-icon name="search" size=".875rem" color="var(--text-300)"></wd-icon>
            <input
              class="w-20 ml-2 text-sm"
              disabled
              type="text"
              placeholder="搜索"
              placeholder-class="text-text-300"
            />
          </view>
        </navigator>
      </view>
      <theme-switch />
    </view>
  </view>
</template>

<script lang="ts" setup>
import themeSwitch from '@/components/theme-switch/index.vue'
import { getStatusBarHeight, getTitleBarHeight } from '@/utils'

const statusBarHeight = getStatusBarHeight()
</script>
