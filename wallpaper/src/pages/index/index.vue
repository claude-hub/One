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
      :list="banners"
      autoplay
      v-model:current="current"
      @click="handleClick"
      :indicator="{ type: 'dots-bar' }"
      loop
    />

    <!-- <common-title>
      <template #name>每日推荐</template>
      <template #custom>
        <view class="date">
          <view class="center gap-1">
            <wd-icon name="calendar" size="1.25rem" color="var(--primary-100)"></wd-icon>
            <view>
              {{ now }}
            </view>
          </view>
        </view>
      </template>
    </common-title>
    <scroll-view scroll-x class="px-3">
      <view class="flex items-center gap-3">
        <view v-for="item in data?.[0]?.wallpapers?.[0]?.urls" :key="item" @click="goPreview(item)">
          <wd-img width="8rem" mode="widthFix" :src="item" :radius="12"></wd-img>
        </view>
      </view>
    </scroll-view>

    <div class="mt-3 grid grid-cols-3 gap-3 px-3">
      <div v-for="(img, index) in data?.[0]?.wallpapers?.[0]?.urls" :key="index">
        <wd-img width="100%" mode="widthFix" :src="img" :radius="12" class="w-full"></wd-img>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { ref } from 'vue'

import { getHomeData } from '@/service'

const { loading, error, data, run } = useRequest(() => getHomeData())
run()

const current = ref<number>(0)
const now = dayjs().format('MM.DD')

const banners = computed(() => {
  return data.value?.banners.map((item) => item.url) || []
})

function handleClick(e) {
  console.log(e)
}

defineOptions({
  name: 'Home',
})
</script>
