export type PostsListRes = {
  code: number
  message: string
  data: PostsListResData[]
  count: number
  page: number
  totalPage: number
}

export type PostsListResData = {
  id_post: number
  id_threads: string
  threads_title: string
  content: string
  created_at: Date
  updated_at: Date
  username: string
  user_uuid: string
  profile_picture: string
  name: string
}

export type PostOneRes = {
  code: number
  message: string
  data: PostOneResData
}

export type PostOneResData = {
  id_post: number
  id_threads: number
  threads_title: string
  content: string
  created_at: Date
  updated_at: Date
  username: string
  user_uuid: string
  profile_picture: string
  name: string
}
