/**
 * 传入图片地址，跳转到图片预览页面
 * @param url
 * @returns
 */
export const goPreview = (url: string) => {
  if (!url) {
    return
  }

  uni.navigateTo({
    url: `/pages/preview/index?url=${url}`,
  })
}
