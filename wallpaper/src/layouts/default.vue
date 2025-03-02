<template>
  <view class="flex flex-col h-screen bg-bg-100 text-text-100">
    <nav-bar />
    <view class="content flex-1 overflow-y-auto">
      <slot />
    </view>
    <tab-bar />
  </view>
</template>

<script lang="ts" setup>
import NavBar from '@/components/nav-bar/index.vue'
import TabBar from '@/components/tab-bar/index.vue'
</script>
