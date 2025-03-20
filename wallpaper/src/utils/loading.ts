// 单例模式的loading类
class Loading {
  private static instance: Loading
  private isLoading: boolean = false

  private constructor() {}

  public static getInstance(): Loading {
    if (!Loading.instance) {
      Loading.instance = new Loading()
    }
    return Loading.instance
  }

  // 显示loading
  public show(title: string = '加载中...') {
    if (!this.isLoading) {
      uni.showLoading({
        title,
        mask: true,
      })
      this.isLoading = true
    }
  }

  // 隐藏loading
  public hide() {
    if (this.isLoading) {
      uni.hideLoading()
      this.isLoading = false
    }
  }
}

// 导出单例实例
export const loading = Loading.getInstance()
