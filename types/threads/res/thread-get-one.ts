export type ThreadOneRes = {
  code: number
  message: string
  data: ThreadOneResData
}

export type ThreadOneResData = {
  number_of_users: number
  number_of_posts: number
  id_threads: number
  id_course: number
  threads_title: string
  created_at: Date
  updated_at: Date
  name: string
  username: string
  profile_picture: string
}
