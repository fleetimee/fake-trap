export type UserListRes = {
  code: number
  message: string
  data: UserListResData[]
  count: number
  page: number
  totalPage: number
}

export type UserListResData = {
  uuid: string
  name: string
  created_at: Date
  updated_at: Date
  deleted_at: null
  username: string
  email: string
  password: string
  last_login: Date | null
  user_quiz: null
  roles: string
  atasan: string
  profile_picture: string
}
