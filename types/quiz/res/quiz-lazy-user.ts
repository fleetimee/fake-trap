export interface QuizLazyUserListRes {
  code: number
  message: string
  data: QuizLazyUserListResData[]
  count: number
  page: number
  totalPage: number
}

export interface QuizLazyUserListResData {
  user_uuid: string
  name: string
  profile_picture: string
  username: string
}
