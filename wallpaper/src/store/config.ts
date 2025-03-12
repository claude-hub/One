import { getGlobalConfig } from '@/service'
import { GlobalConfig } from '@/types'
import { defineStore } from 'pinia'

const defaultConfig: GlobalConfig = {
  version: '',
  error: false,
  prefix: '',
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
        const { data } = await getGlobalConfig()
        this.setConfig(data)
      } catch (error) {
        this.error = true
      }
    },
  },

  persist: false,
})
