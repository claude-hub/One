<template>
  <scroll-view
    :scroll-x="true"
    :show-scrollbar="false"
    :scroll-with-animation="true"
    :scroll-into-view="`type-${activeTag}`"
  >
    <div class="tag-container">
      <div v-for="item in tags" :key="item.name">
        <div
          class="tag-item"
          :class="{
            'tag-default': activeTag !== item.name,
            'tag-active': activeTag === item.name,
          }"
          :id="`type-${item.name}`"
          @click="handleTagClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script setup>
// 定义组件属性
const props = defineProps({
  tags: {
    type: Array,
    default: () => [],
  },
})

// 定义事件
const emit = defineEmits(['click'])

// 当前激活的标签
const activeTag = ref(props.tags[0]?.name || '')

// 标签点击处理函数
const handleTagClick = (item) => {
  activeTag.value = item.name
  emit('click', item)
}
</script>

<style lang="scss" scoped>
.tag-container {
  display: flex;
  gap: 8px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  padding: 4px 16px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 9999px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
}

.tag-default {
  color: #6b7280;
  background-color: #f3f4f6;

  :deep(.dark) & {
    color: #ffffff;
    background-color: #1d1d1d;
  }
}

.tag-active {
  color: #ffffff;
  background-image: linear-gradient(100deg, #50aa46, #2d8f23);
  box-shadow: 0px 0px 10px rgba(80, 170, 70, 0.5);
  animation: tagPulse 0.8s ease-in-out;
}

@keyframes tagPulse {
  0% {
    transform: scale(0.98);
  }
  25% {
    transform: scale(1.08);
  }
  50% {
    transform: scale(0.94);
  }
  75% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}
</style>
