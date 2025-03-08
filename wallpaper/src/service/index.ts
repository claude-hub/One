import { HomeData, ImagesDetail } from '@/types'
import { httpGet } from '@/utils/http'

export const getTagPaths = (path = '/tag/latest.json') => {
  return httpGet<string[]>(path)
}

export const getDailyImages = (path) => {
  return httpGet<ImagesDetail>(path)
}

export const getHomeData = () => {
  return httpGet<HomeData>('/index.json')
}
