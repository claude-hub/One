<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <div>
    <wd-swiper
      :list="swiperList"
      autoplay
      v-model:current="current"
      @click="handleClick"
      @change="onChange"
      :indicator="{ type: 'dots-bar' }"
      loop
    ></wd-swiper>

    <div class="mt-3 grid grid-cols-3 gap-3">
      <div v-for="(img, index) in data?.[0].wallpapers[0].urls" :key="index">
        <wd-img width="100%" mode="widthFix" :src="img" :radius="12" class="w-full"></wd-img>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getData, IData } from '@/service/index'
const { data, run } = useRequest<IData>(() => getData())
run()

const current = ref<number>(0)

const swiperList = ref([
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/redpanda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/capybara.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/panda.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/moon.jpg',
  'https://registry.npmmirror.com/wot-design-uni-assets/*/files/meng.jpg',
])
function handleClick(e) {
  console.log(e)
}
function onChange(e) {
  console.log(e)
}

defineOptions({
  name: 'Home',
})
</script>
