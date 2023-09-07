export type UserQuizTakenListRes = {
  code: number
  message: string
  data: UserQuizTakenListResData[]
}

export type UserQuizTakenListResData = {
  id_quiz: number
  quiz_title: string
  quiz_desc: string
  quiz_type: string
  created_at: Date
  score: number
}
