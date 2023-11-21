export type RoleListRes = {
  code: number
  message: string
  data: RoleListResData[]
  count: number
  page: number
  totalPage: number
}

export type RoleListResData = {
  id_role: number
  role_name: string
  role_description: string
  created_at: Date
  updated_at: Date
}
