export type UserOneRes = {
  code: number
  message: string
  data: UserOneResData
}

export type UserOneResData = {
  uuid: string
  created_at: Date
  updated_at: Date
  deleted_at: null
  name: string
  username: string
  email: string
  password: string
  last_login: Date
  role: UserOneResRole[]
}

export type UserOneResRole = {
  id_role: number
  role_name: string
  role_description: string
  created_at: Date
  updated_at: Date
}
