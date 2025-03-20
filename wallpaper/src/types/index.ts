interface Banner {
  value: string
  path: string
  type?: string
  poster?: string
}

interface Category extends NavigationTitle {
  width: number
  height: number
  images: {
    name: string
    desc: string
    src: string
    path: string
    count: number
  }[]
}

export interface NavigationTitle {
  name: string
  desc: string
  type: string
}

interface More extends NavigationTitle {
  categories: {
    name: string
    path: string
  }[]
}

export interface HomeData {
  banners: Banner[]
  categories: Category[]
  more: More
}

interface CategoryDetail {
  name: string
  logo: string
  path: string
}

export interface CategoryData {
  name: string
  children: CategoryDetail[]
}

export interface GlobalConfig {
  version: string
  error?: boolean
  ready: boolean
  apiPrefix: string
  imgPrefix: string
}

export interface ImageCollection {
  name: string
  tags?: string[]
  images: string[]
}
