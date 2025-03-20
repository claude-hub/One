<script setup lang="ts">
import { useConfigStore, useThemeStore } from '@/store'
import { onLaunch } from '@dcloudio/uni-app'
import { loading } from './utils'

const themeStore = useThemeStore()
const globalConfig = useConfigStore()

onLaunch(async () => {
  try {
    const isDark = themeStore.theme === 'dark'
    uni.setNavigationBarColor({
      frontColor: isDark ? '#ffffff' : '#000000',
      backgroundColor: 'transparent',
    })

    loading.show()
    await globalConfig.fetchConfig()
  } finally {
    loading.hide()
  }
})
</script>

<!-- <style>
.title {
  font-family: 'Ma Shan Zheng', sans-serif;
}
@font-face {
  font-family: 'Ma Shan Zheng';
  font-style: normal;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/ma-shan-zheng@latest/chinese-simplified-400-normal.woff2)
    format('woff2');
  font-display: block;
}
</style> -->
