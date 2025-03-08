import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  lazyCodeLoading: 'requiredComponents',
  globalStyle: {
    navigationStyle: 'custom',
    navigationBarTitleText: 'wrapper',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
    onReachBottomDistance: 300,
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  tabBar: {
    custom: true,
    color: '#999999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/sy.png',
        selectedIconPath: 'static/tabbar/sy_art.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/center.png',
        selectedIconPath: 'static/tabbar/center_art.png',
        pagePath: 'pages/classify/index',
        text: '分类',
      },
      {
        iconPath: 'static/tabbar/find.png',
        selectedIconPath: 'static/tabbar/find_art.png',
        pagePath: 'pages/search/index',
        text: '发现',
      },
      {
        iconPath: 'static/tabbar/wd.png',
        selectedIconPath: 'static/tabbar/wd_art.png',
        pagePath: 'pages/user/index',
        text: '我的',
      },
    ],
  },
})
