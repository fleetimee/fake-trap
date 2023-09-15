export type CourseVacantUserListRes = {
  code: number
  message: string
  data: CourseVacantUserListResData[]
}

export type CourseVacantUserListResData = {
  username: string
  user_uuid: string
}
