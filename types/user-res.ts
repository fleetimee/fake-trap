export type UserResponse = {
  count: number
  data: UserData[]
  page: number
  totalPages: number
}

export type UserData = {
  uuid: string
  created_at: Date
  updated_at: Date
  deleted_at: null
  username: string
  email: string
  password: string
  last_login: Date | null
  user_quiz: null
}
