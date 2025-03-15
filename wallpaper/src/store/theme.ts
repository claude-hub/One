import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ConfigProviderThemeVars } from 'wot-design-uni'
export const useThemeStore = defineStore(
  'theme',
  () => {
    const theme = ref<'light' | 'dark'>('dark')
    const themeVars = ref<ConfigProviderThemeVars>()

    const toggleTheme = (mode?: 'light' | 'dark') => {
      theme.value = mode || (theme.value === 'light' ? 'dark' : 'light')
    }

    const setThemeVars = (vars: ConfigProviderThemeVars) => {
      themeVars.value = vars
    }

    return {
      theme,
      themeVars,
      toggleTheme,
      setThemeVars,
    }
  },
  {
    persist: true,
  },
)
