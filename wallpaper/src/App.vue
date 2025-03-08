<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

import { useThemeStore } from '@/store'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark } = storeToRefs(themeStore)

watch(
  () => isDark.value,
  (newVal) => {
    uni.setNavigationBarColor({
      frontColor: newVal ? '#ffffff' : '#000000',
      backgroundColor: 'transparent',
    })
  },
  { immediate: true },
)

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
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
