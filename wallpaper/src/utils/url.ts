/**
 * 传入图片地址，跳转到图片预览页面
 * @param url
 * @returns
 */
export const goPreview = (url: string, base = '') => {
  const id = url.split('/').pop()?.split('.')[0]

  if (!id) {
    return
  }

  uni.navigateTo({
    url: `/pages/preview/index?id=${id}&base=${base}`,
  })
}
