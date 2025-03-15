<route lang="json5" type="home">
{
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <!-- 轮播 -->
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

  <!-- 推荐列表 -->
  <div v-for="(item, index) in data?.categories" :key="index">
    <common-title :nav="item" />

    <scroll-view scroll-x>
      <div class="flex items-center gap-3 text-white">
        <div v-for="image in item.images" :key="image.src" @click="goToDetail(image.path)">
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
                class="aspect-square flex-center border-2 border-solid border-amber rounded-full w-6 h-6"
              >
                {{ image.count }}
              </div>
            </div>
            <div class="absolute bottom-3 left-0 right-0 px-3" v-if="image.name">
              <div class="h-11 px-5 py-3 bg-white/22 rounded-4 backdrop-blur-sm">
                <div class="text-sm">{{ image.name }}</div>
                <div class="text-xs text-gray-300 mt-2" v-if="image.desc">{{ image.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>

  <!-- 更多推荐 -->
  <common-title v-if="data?.more" :nav="data?.more" />
  <scroll-tags
    v-if="data?.more?.categories.length"
    :tags="data?.more?.categories"
    @click="(item) => handleSwitchTag(item.name)"
  />
  <div class="mt-6 grid grid-cols-2 gap-3" v-if="images.length">
    <div v-for="(img, index) in images" :key="index" @click="goPreview(img)">
      <wd-img
        lazy-load
        width="100%"
        :height="366"
        mode="aspectFill"
        :src="img"
        :radius="12"
        class="w-full"
      ></wd-img>
    </div>
  </div>

  <!-- load more -->
  <load-more :state="state" @reload="loadAgain" />

  <!-- back top -->
  <wd-backtop :scrollTop="scrollTop" :duration="300">
    <wd-img
      width="24"
      height="24"
      :custom-class="'back-top'"
      src="/static/images/backtop.png"
      mode="aspectFit"
    />
  </wd-backtop>
</template>

<script lang="ts" setup>
import CommonTitle from '@/components/common-title/index.vue'
import LoadMore from '@/components/load-more/index.vue'
import ScrollTags from '@/components/scroll-tags/index.vue'
import { getDailyImages, getHomeData, getTagPaths } from '@/service'
import { HomeData } from '@/types'
import { goPreview, goToDetail } from '@/utils'
import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
import { ref } from 'vue'

const scrollTop = ref<number>(0)
onPageScroll((e) => {
  scrollTop.value = e.scrollTop
})

const { data, run } = useRequest<HomeData>(() => getHomeData())

const init = async () => {
  try {
    uni.showLoading({ title: '加载中...', mask: true })
    await run()

    if (!data.value?.more?.categories?.length) return
    const { path } = data.value.more.categories[0]
    const { data: latestData } = await getTagPaths(path)
    paths.value = latestData
  } finally {
    uni.hideLoading()
  }
}

onLoad(() => {
  init()
})

const images = ref<string[]>([])
const paths = ref<string[]>([])
const currentSwiper = ref<number>(0)
const state = ref<string>('')
const currentPath = ref('')

const handleSwitchTag = async (tag: string) => {
  try {
    uni.showLoading({ title: '加载中...' })
    const path = data.value?.more.categories.find((item) => item.name === tag)?.path || ''
    const { data: tagData } = await getTagPaths(path)
    paths.value = tagData
    await getCurrentTagImages(true)
  } catch (error) {
    uni.showToast({ title: '请重试', icon: 'none' })
  } finally {
    uni.hideLoading()
  }
}

const loadAgain = async () => {
  try {
    state.value = 'loading'
    const { data } = await getDailyImages(currentPath.value)
    images.value = images.value.concat(data)
  } catch (error) {
    state.value = 'error'
  }
}

const getCurrentTagImages = async (isCover = false) => {
  if (state.value === 'error' || paths.value.length <= 0) return
  state.value = 'loading'
  try {
    const path = paths.value.shift()
    if (path) {
      currentPath.value = path
      const { data } = await getDailyImages(path)
      if (isCover) {
        images.value = data
      } else {
        images.value = images.value.concat(data)
      }
    }
    if (paths.value.length <= 0) {
      state.value = 'finished'
    }
  } catch (error) {
    state.value = 'error'
  }
}

onReachBottom(() => {
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
