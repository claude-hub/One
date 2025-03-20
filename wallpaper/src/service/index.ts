import { CategoryData, GlobalConfig, HomeData } from '@/types'
import { httpGet } from '@/utils/http'

export const getTagPaths = (path) => {
  return httpGet<string[]>(path)
}

export const getDailyImages = (path) => {
  return httpGet<string[]>(path)
}

export const getHomeData = () => {
  return httpGet<HomeData>('/data/index.json')
}

export const getDetails = (path) => {
  return httpGet<{ name: string; images: string[] }>(path)
}

export const getCategoryData = () => {
  return httpGet<CategoryData[]>('/data/categories/index.json')
}

/**
 * 获取全局配置
 */
export const getGlobalConfig = async () => {
  const res = await httpGet<GlobalConfig>('/data/config.json')
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(res)
    }, 300)
  })
}
