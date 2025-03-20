import { getGlobalConfig } from '@/service'
import { GlobalConfig } from '@/types'
import { defineStore } from 'pinia'

const defaultConfig: GlobalConfig = {
  version: '',
  error: false,
  apiPrefix: '',
  imgPrefix: '',
  ready: false,
}

export const useConfigStore = defineStore('config', {
  state: (): GlobalConfig => defaultConfig,

  actions: {
    // 更新全局配置
    setConfig(config: GlobalConfig) {
      this.$patch(config)
    },

    async fetchConfig() {
      try {
        this.error = false
        this.ready = false
        const { data } = await getGlobalConfig()
        this.setConfig(data)

        this.ready = true
      } catch (error) {
        this.error = true
      }
    },
  },

  persist: false,
})
