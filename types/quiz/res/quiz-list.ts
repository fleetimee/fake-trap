export type QuizListRes = {
  count: number
  data: QuizListResData[]
  page: number
  totalPage: number
}

export type QuizListResData = {
  id_quiz: number
  quiz_title: string
  quiz_desc: string
  quiz_type: string
  created_at: Date
  id_section: number | null
}
