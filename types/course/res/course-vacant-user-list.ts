export type CourseVacantUserListRes = {
  code: number
  message: string
  data: CourseVacantUserListResData[]
}

export type CourseVacantUserListResData = {
  name: string
  username: string
  user_uuid: string
}
