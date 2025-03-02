<template>
  <view class="w-full" :style="{ paddingTop: statusBarHeight + 'px' }">
    <view class="center-y px-4 h-11 gap-2">
      <image class="w-8 h-8" src="/static/logo.svg" mode="aspectFit" />
      <text class="text-text-200">{{ title }}</text>

      <view class="ml-4">
        <view class="flex items-center rounded-full px-3 h-8 bg-bg-200">
          <wd-icon name="search" size="16px" color="var(--text-300)"></wd-icon>
          <input
            class="w-20 ml-4"
            disabled
            type="text"
            placeholder="搜索"
            placeholder-class="text-text-300"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '奇点',
  },
})

// 获取状态栏高度
const { statusBarHeight } = uni.getSystemInfoSync()
</script>
