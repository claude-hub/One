<template>
  <wd-img :src="fullSrc" v-bind="$attrs" />
</template>

<script setup name="MyImg">
import { useConfigStore } from '@/store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const globalStore = useConfigStore()
const { imgPrefix } = storeToRefs(globalStore)

// 定义组件属性
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})

// 设置组件不自动继承属性
defineOptions({
  inheritAttrs: false,
})

const fullSrc = computed(() => {
  // 直接获取 imgPrefix 的值而不是响应式对象
  const cdnPrefix = imgPrefix.value || ''
  return props.src.startsWith('http') || props.src.startsWith('data:')
    ? props.src
    : cdnPrefix + props.src
})
</script>
