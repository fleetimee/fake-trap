export type ThreadListRes = {
  code: number
  message: string
  data: ThreadListResData[]
  count: number
  page: number
  totalPage: number
}

export type ThreadListResData = {
  number_of_users: number
  number_of_posts: number
  id_threads: number
  id_course: number
  threads_title: string
  created_at: Date
  updated_at: Date
  user_uuid: string
  name: string
  email: string
  username: string
  profile_picture: string
}
