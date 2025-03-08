import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    const isDark = ref(true)

    const toggleTheme = () => {
      isDark.value = !isDark.value
    }

    return {
      isDark,
      toggleTheme,
    }
  },
  {
    persist: true,
  },
)
