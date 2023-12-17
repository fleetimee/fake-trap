export type QuizMemberListRes = {
  code: number
  message: string
  data: QuizMemberListResData[]
  count: number
  page: number
  totalPage: number
}

export type QuizMemberListResData = {
  name: string
  username: string
  user_uuid: string
  attemps: number
}
