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
      <common-title :nav="item" />

      <scroll-view scroll-x>
        <div class="flex items-center gap-3 text-white">
          <div v-for="image in item.images" :key="image.src" @click="goPreview(image.path)">
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

    <common-title v-if="data?.more" :nav="data?.more" />

    <scroll-view
      :scroll-x="true"
      :show-scrollbar="false"
      :scroll-with-animation="true"
      :scroll-into-view="`type-${currentType}`"
    >
      <div class="flex-y gap-4">
        <template v-for="item in data?.more?.categories" :key="item.name">
          <div
            class="flex-auto px-4 py-1 rounded-full text-sm ws-nowrap"
            :class="{
              'text-gray-500 bg-gray-100 dark:(bg-[#1d1d1d] text-white)': currentType !== item.name,
              'text-white bg-[#50AA46]': currentType === item.name,
            }"
            :id="`type-${item.name}`"
            @click="handleSwitchTag(item.name)"
          >
            {{ item.name }}
          </div>
        </template>
      </div>
    </scroll-view>

    <div class="mt-3 grid grid-cols-3 gap-3 px-3" v-if="images.length">
      <div v-for="(img, index) in images" :key="index">
        <wd-img width="100%" mode="widthFix" :src="img" :radius="12" class="w-full"></wd-img>
      </div>
    </div>

    <wd-loadmore
      :state="state"
      @reload="loadAgain"
      finished-text="没有更多了"
      :custom-class="loadMoreClass"
    />
  </div>
</template>

<script lang="ts" setup>
import CommonTitle from '@/components/common-title/index.vue'
import { getDailyImages, getHomeData, getTagPaths } from '@/service'
import { useThemeStore } from '@/store'
import { HomeData } from '@/types'
import { goPreview } from '@/utils'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

const { data, error, run } = useRequest<HomeData>(() => getHomeData())

const loadMoreClass = computed(() => {
  return {
    darkMore: isDark.value,
  }
})

const init = async () => {
  try {
    uni.showLoading({ title: '加载中...', mask: true })
    await run()
  } finally {
    uni.hideLoading()
  }
}

onLoad(() => {
  init()
})

const currentType = ref('')
const images = ref<string[]>([])
const paths = ref<string[]>([])
const currentSwiper = ref<number>(0)
const state = ref<string>('')
const currentPath = ref('')

watch(
  () => data.value,
  async (newVal) => {
    if (!newVal?.more?.categories?.length) return
    currentType.value = newVal.more.categories[0].name || ''
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
  try {
    uni.showLoading({ title: '加载中...' })
    currentType.value = tag
    const path = data.value?.more.categories.find((item) => item.name === tag)?.data || ''
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
    images.value = images.value.concat(data.images)
  } catch (error) {
    state.value = 'error'
  }
}

const getCurrentTagImages = async (isCover = false) => {
  if (state.value === 'error') return
  state.value = 'loading'
  try {
    const path = paths.value.shift()
    if (path) {
      currentPath.value = path
      const { data } = await getDailyImages(path)
      if (isCover) {
        images.value = data.images
      } else {
        images.value = images.value.concat(data.images)
      }
    }

    if (paths.value.length === 0) {
      state.value = 'finished'
    }
  } catch (error) {
    state.value = 'error'
  } finally {
    uni.hideLoading()
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

<style lang="scss" scoped>
:deep(.darkMore) {
  --wot-loadmore-color: #fff;
  --wot-divider-color: #fff;
}
</style>
