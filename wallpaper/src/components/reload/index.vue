<template>
  <div class="text-center">
    <div class="mb-3">网络错误，换个网络试试</div>
    <wd-button icon="refresh" size="small" @click="handleReload">点击重试</wd-button>
  </div>
</template>

<script lang="ts" setup>
import { useConfigStore } from '@/store'
import { currRoute } from '@/utils'

const props = defineProps({
  onReload: {
    type: Function,
    default: null,
  },
})

const globalConfig = useConfigStore()

const handleReload = () => {
  globalConfig.fetchConfig()

  if (props.onReload) {
    props.onReload()
  } else {
    // 默认重启页面
    const { path } = currRoute()
    uni.reLaunch({
      url: path,
    })
  }
}
</script>
