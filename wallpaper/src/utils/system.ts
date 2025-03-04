const WINDOW_INFO = uni.getWindowInfo()

export const getStatusBarHeight = () => WINDOW_INFO.statusBarHeight || 15

export const getTitleBarHeight = () => {
  if (uni.getMenuButtonBoundingClientRect) {
    const { top, height } = uni.getMenuButtonBoundingClientRect()
    return height + (top - getStatusBarHeight()) * 2
  } else {
    return 40
  }
}

export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()
