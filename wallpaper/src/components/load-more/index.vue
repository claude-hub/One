<template>
  <wd-loadmore :state="state" @reload="$emit('reload')" finished-text="没有更多了" />
</template>

<script lang="ts" setup>
defineProps({
  state: {
    type: String,
    default: '',
  },
})

defineEmits(['reload'])
</script>
