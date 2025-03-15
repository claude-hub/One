<script setup lang="ts">
import { useConfigStore, useThemeStore } from '@/store'
import { onLaunch } from '@dcloudio/uni-app'

const themeStore = useThemeStore()
const globalConfig = useConfigStore()

onLaunch(() => {
  try {
    const isDark = themeStore.theme === 'dark'
    uni.setNavigationBarColor({
      frontColor: isDark ? '#ffffff' : '#000000',
      backgroundColor: 'transparent',
    })

    uni.showLoading({
      title: '加载中...',
      mask: true,
    })
    globalConfig.fetchConfig()
  } finally {
    uni.hideLoading()
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
