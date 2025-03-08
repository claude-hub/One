<route lang="json5" type="home">
{
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <div v-if="error" class="flex-1 flex-center">
    <div class="text-center">
      <div class="mb-3">网络错误，换个网络试试</div>
      <wd-button icon="refresh" size="small" @click="reload">点击重试</wd-button>
    </div>
  </div>
  <div v-else>
    <wd-swiper
      v-if="data?.banners?.length"
      :list="data?.banners"
      autoplay
      stopAutoplayWhenVideoPlay
      v-model:currentType="currentSwiper"
      @click="handleClick"
      :indicator="{ type: 'dots-bar' }"
      loop
    />

    <div v-for="(item, index) in data?.categories" :key="index">
      <div class="flex-between items-start pt-5 pb-3">
        <div>
          <div class="text-3xl font-medium title">{{ item.name }}</div>
          <div class="text-sm">{{ item.desc }}</div>
        </div>
        <navigator
          :url="item.path"
          :open-type="item.pathType"
          class="flex-center gap-1 text-xs bg-white/14.5 text-gray-500 rounded-8 px-3 py-2 uppercase"
        >
          <div>more</div>
          <wd-icon name="chevron-right" size="16px"></wd-icon>
        </navigator>
      </div>

      <scroll-view scroll-x>
        <div class="flex items-center gap-3">
          <div v-for="image in item?.images" :key="image.src" @click="goPreview(image.path)">
            <div class="relative">
              <wd-img
                :width="item.width"
                :height="item.height"
                mode="aspectFill"
                :src="image.src"
                :radius="24"
              ></wd-img>
              <div class="absolute font-600 top-3 right-3" v-if="image.count">
                <div
                  class="aspect-square flex-center border-2 border-solid border-amber rounded-full w-7 h-7"
                >
                  {{ image.count }}
                </div>
              </div>
              <div class="absolute bottom-3 left-0 right-0 px-3" v-if="image.name">
                <div class="px-5 py-3 bg-white/22 rounded-4 backdrop-blur-sm">
                  <div class="text-sm">{{ image.name }}</div>
                  <div class="text-xs text-gray-300 mt-2">{{ image.desc }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>

    <div class="flex-between items-start pt-5 pb-3" v-if="data?.more?.name">
      <div>
        <div class="text-3xl font-medium title">{{ data.more.name }}</div>
        <div class="text-sm">{{ data.more.desc }}</div>
      </div>
      <navigator
        :url="data.more.path"
        :open-type="data.more.pathType"
        class="flex-center gap-1 text-xs bg-white/14.5 text-gray-500 rounded-8 px-3 py-2 uppercase"
      >
        <div>more</div>
        <wd-icon name="chevron-right" size="16px"></wd-icon>
      </navigator>
    </div>

    <scroll-view
      :scroll-x="true"
      :show-scrollbar="false"
      :scroll-with-animation="true"
      :scroll-into-view="`type-${currentType}`"
    >
      <div class="flex-y gap-4">
        <template v-for="item in data?.more?.categories" :key="item.name">
          <div
            class="flex-auto px-4 py-1 bg-[#1d1d1d] rounded-full text-sm ws-nowrap"
            :class="{ 'bg-[#50AA46]': currentType === item.name }"
            :id="`type-${item.name}`"
            @click="handleSwitchTag(item.name)"
          >
            {{ item.name }}
          </div>
        </template>
      </div>
    </scroll-view>

    <div class="mt-3 grid grid-cols-3 gap-3 px-3">
      <div v-for="(img, index) in images" :key="index">
        <wd-img width="100%" mode="widthFix" :src="img" :radius="12" class="w-full"></wd-img>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getDailyImages, getHomeData, getTagPaths } from '@/service'
import { HomeData } from '@/types'
import { goPreview } from '@/utils'
import { onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'

const { data, error } = useRequest<HomeData>(() => getHomeData(), {
  immediate: true,
})
// 当前选择的类型名称
const currentType = ref('')
// 当前标签下的图片
const images = ref<string[]>([])
// 当前标签下的。图片 url 列表
const paths = ref<string[]>([])
// 当前的轮播图
const currentSwiper = ref<number>(0)

watch(
  () => data.value,
  async (newVal) => {
    currentType.value = newVal?.more.categories[0].name || ''

    // 首页有数据后，才请求标签列表
    const { data } = await getTagPaths()
    paths.value = data
  },
  { once: true },
)

const reload = () => {
  uni.reLaunch({
    url: '/pages/index/index',
  })
}

const handleSwitchTag = async (tag: string) => {
  uni.showLoading({ title: '加载中...' })

  currentType.value = tag
  const path = data.value?.more.categories.find((item) => item.name === tag)?.data || ''
  const { data: tagData } = await getTagPaths(path)
  paths.value = tagData
  getCurrentTagImages(true)
}

const getCurrentTagImages = async (isCover = false) => {
  const path = paths.value.shift()
  if (path) {
    const { data } = await getDailyImages(path)
    if (isCover) {
      images.value = data.images
    } else {
      images.value = images.value.concat(data.images)
    }
  }

  uni.hideLoading()
}

onReachBottom(async () => {
  getCurrentTagImages()
})

function handleClick({ index }) {
  const banners = data.value?.banners
  if (banners?.length) {
    const item = banners[index]
    if (item?.path) {
      goPreview(item.path)
    }
  }
}

defineOptions({
  name: 'Home',
})
</script>
