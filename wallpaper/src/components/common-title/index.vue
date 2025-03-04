<template>
  <view class="flex items-center justify-between px-2 pt-4 pb-2">
    <view class="text-lg">
      <slot name="name"></slot>
    </view>
    <view>
      <slot name="custom"></slot>
    </view>
  </view>
</template>
