export type UserQuizGroupedRes = {
  code: number
  message: string
  data: UserQuizGroupedResData[]
  count: number
  page: number
  totalPage: number
}

export type UserQuizGroupedResData = {
  id_quiz: number
  quiz_title: string
  quiz_desc: string
  quiz_type: string
  created_at: Date
  average_score: number
}
