export interface Banner {
  value: string
  path: string
  type?: string
  poster?: string
}

export interface Image {
  name: string
  desc: string
  src: string
  path: string
  count: number
}

export interface Category {
  name: string
  desc: string
  path: string
  pathType: string
  width: number
  height: number
  images: Image[]
}

export interface Type {
  name: string
  data: string
}

export interface More {
  name: string
  desc: string
  path: string
  pathType: string
  categories: Type[]
}

export interface HomeData {
  banners: Banner[]
  categories: Category[]
  more: More
}

export interface ImagesDetail {
  title: string
  images: string[]
}
