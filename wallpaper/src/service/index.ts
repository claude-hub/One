import { HomeData } from '@/types'
import { httpGet } from '@/utils/http'

export const getTagPaths = (path) => {
  return httpGet<string[]>(path)
}

export const getDailyImages = (path) => {
  return httpGet<string[]>(path)
}

export const getHomeData = () => {
  return httpGet<HomeData>('/index.json')
}
