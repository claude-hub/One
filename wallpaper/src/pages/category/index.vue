<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '分类',
  },
}
</route>

<template>
  <div v-if="curCategory?.name">
    <wd-segmented
      :options="segmentedOptions"
      size="large"
      @change="handleSegmentedChange"
    ></wd-segmented>

    <div class="flex items-start gap-3 mt-4">
      <wd-sidebar v-model="activeSidebar">
        <wd-sidebar-item
          v-for="item in curCategory.categories"
          :key="`sidebar-${item.name}`"
          :value="item.name"
          :label="item.name"
        ></wd-sidebar-item>
      </wd-sidebar>

      <div class="grid grid-cols-3 gap-2 flex-1" v-if="curDetail?.length">
        <div
          class="relative"
          v-for="(category, index) in curDetail"
          :key="index"
          @click="goToDetail(category.path)"
        >
          <wd-img
            :height="100"
            width="100%"
            mode="aspectFill"
            :src="category.image"
            :radius="8"
          ></wd-img>
          <div
            class="absolute bottom-0 left-0 right-0 py-1.5 px-2 text-center dark:(bg-black/50) backdrop-blur-md rounded-b-2 text-xs"
            v-if="category.name"
          >
            <div class="truncate">{{ category.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCategoryData } from '@/service'
import { CategoryData } from '@/types'
import { goToDetail } from '@/utils'
import { onLoad } from '@dcloudio/uni-app'

const categories = ref([])
const curCategory = ref<CategoryData>()
const activeSidebar = ref('')

const handleSegmentedChange = ({ value }) => {
  const data = categories.value.find((item) => item.name === value)
  curCategory.value = data
  activeSidebar.value = data.categories?.[0]?.name || ''
}
const segmentedOptions = ref([])

const curDetail = computed(() => {
  return curCategory.value?.categories?.find((item) => item.name === activeSidebar.value)?.details
})

const init = async () => {
  try {
    uni.showLoading({ title: '加载中...', mask: true })
    const { data } = await getCategoryData()
    if (!data.length) return
    categories.value = data
    // 顶部数据
    segmentedOptions.value = data.map((item) => item.name)
    // 当前选中的分类
    curCategory.value = data[0]
    // 当前激活的左侧菜单
    activeSidebar.value = data[0].categories?.[0]?.name || ''
  } catch (error) {
    uni.showToast({
      title: '获取分类失败',
      icon: 'none',
    })
  } finally {
    uni.hideLoading()
  }
}

onLoad(() => {
  init()
})
</script>
