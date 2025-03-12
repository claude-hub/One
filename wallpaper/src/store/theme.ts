import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const isDark = ref(true)

    const toggleTheme = () => {
      isDark.value = !isDark.value
    }

    const getTheme = () => {
      return isDark.value
    }

    return {
      isDark,
      toggleTheme,
      getTheme,
    }
  },
  {
    persist: true,
  },
)
