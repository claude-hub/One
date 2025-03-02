<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <div class="p-2">
    <div class="grid grid-cols-3 gap-1">
      <div v-for="(img, index) in data?.[0].wallpapers[0].urls" :key="index">
        <wd-img width="100%" mode="widthFix" :src="img" class="w-full"></wd-img>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getData, IData } from '@/service/index' // 看这里
const { data, run } = useRequest<IData>(() => getData())

run()

defineOptions({
  name: 'Home',
})
</script>
