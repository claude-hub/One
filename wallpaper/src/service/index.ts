interface Banner {
  url: string
  path: string
}

interface Album {
  name: string
  desc: string
  cover: string
  path: string
}

interface Albums {
  name: string
  desc: string
  path: string
  album: Album[]
}

interface Category {
  name: string
  desc: string
  path: string
  images: string[]
}

interface MoreCategory {
  name: string
  data: string
}

interface More {
  name: string
  desc: string
  path: string
  categories: MoreCategory[]
}

export interface HomeData {
  banners: Banner[]
  albums: Albums
  categories: Category[]
  more: More
}

export const getHomeData = (): Promise<IResData<HomeData>> => {
  return new Promise((resolve) => {
    resolve({
      code: 200,
      data: {
        banners: [
          {
            url: 'https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503022240002.jpg',
            path: '/pages/classify',
          },
          {
            url: 'https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503022240001.jpg',
            path: '/pages/classify',
          },
          {
            url: 'https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503022240000.jpg',
            path: '/pages/classify',
          },
        ],
        albums: {
          name: '壁纸专辑',
          desc: 'Wallpaper album',
          path: '/pages/classify',
          album: [
            {
              name: '哆啦A梦',
              desc: '',
              cover:
                '/thumbhttps://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503011030258.webp',
              path: '/pages/classify',
            },
            {
              name: '哪吒之魔童闹海',
              desc: '',
              cover:
                '/thumbhttps://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503011016176.webp',
              path: '/pages/classify',
            },
          ],
        },
        categories: [
          {
            name: '电脑平板',
            desc: '',
            path: '/pages/classify',
            images: [
              '/thumbhttps://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503011014514.webp',
              '/thumbhttps://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503011016176.webp',
              '/thumbhttps://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503011025433.webp',
            ],
          },
          {
            name: '精选头像',
            desc: '',
            path: '/pages/classify',
            images: [
              '/thumbhttps://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503011014514.webp',
              '/thumbhttps://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503011016176.webp',
              '/thumbhttps://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/wallpaper/202503011025433.webp',
            ],
          },
        ],
        more: {
          name: 'LATEST',
          desc: 'Wallpaper album',
          path: '/pages/classify',
          categories: [
            {
              name: '最新',
              data: '/latest.json',
            },
            {
              name: '热门',
              data: '/hot.json',
            },
          ],
        },
      },
      msg: 'success',
    })
  })
}
