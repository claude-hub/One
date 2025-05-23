import { getCategoryData } from '@/service'
import { CategoryData } from '@/types'
import { loading } from '@/utils'
import { defineStore } from 'pinia'

// 定义分类状态类型
interface CategoryState {
  categories: CategoryData[]
  type: string
}

export const useCategoriesStore = defineStore('categories', {
  state: (): CategoryState => ({
    categories: [],
    type: '',
  }),

  actions: {
    // 更新全局配置
    setCategories(categories) {
      this.categories = categories
    },

    setType(type) {
      this.type = type
    },

    async fetchCategories() {
      try {
        loading.show()
        const { data } = await getCategoryData()
        this.setCategories(data)
      } catch (error) {
        uni.showToast({
          title: '获取分类失败',
          icon: 'none',
        })
      } finally {
        loading.hide()
      }
    },
  },

  // 获取分类列表
  getters: {
    getCategoryList: (state) => state.categories,
  },

  persist: false,
})
