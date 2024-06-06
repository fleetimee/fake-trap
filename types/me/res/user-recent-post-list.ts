export type UserRecentPostListRes = {
  code: number
  message: string
  data: UserRecentPostListResData[]
}

export type UserRecentPostListResData = {
  id_post: number
  id_course: number
  id_threads: number
  threads_title: string
  created_at: Date
  updated_at: Date
  username: string
  user_uuid: string
  course_name: string
  role_name: string
}
