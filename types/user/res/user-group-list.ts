export type UserGroupListRes = {
  code: number
  message: string
  data: UserGroupListResData[]
}

export type UserGroupListResData = {
  name: string
  username: string
  user_uuid: string
  group: number
}
