<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '我的',
  },
}
</route>

<template>
  <div class="p-4 bg-bg-200 rounded-3 flex justify-between items-center" @click="goToAbout">
    <div>关于</div>
    <i class="i-carbon-chevron-right"></i>
  </div>

  <!-- <div class="p-4 flex-center">
    <div>
      <md-button open-type="feedback" plain>意见反馈</md-button>
      <i class="i-carbon-help ml-2"></i>
    </div>
  </div> -->
</template>

<script lang="ts" setup>
const goToAbout = () => {
  uni.navigateTo({
    url: '/pages/about/index',
  })
}
</script>
