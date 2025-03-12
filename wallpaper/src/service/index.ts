import { GlobalConfig, HomeData } from '@/types'
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

/**
 * 获取全局配置
 */
export const getGlobalConfig = () => {
  return httpGet<GlobalConfig>('/data/config.json')
}
