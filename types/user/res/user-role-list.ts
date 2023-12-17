export type UserRoleListRes = {
  code: number
  message: string
  data: UserRoleListResData[]
}

export type UserRoleListResData = {
  name: string
  user_uuid: string
}
