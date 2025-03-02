import { httpGet } from '@/utils/http'
export interface IData {
  id: string
  name: string
}

export const getData = () => {
  return httpGet<IData>('/data.json')
}
