export type QuizRes = {
  count: number
  data: QuizData[]
  page: number
  totalPages: number
}

export type QuizData = {
  id_quiz: number
  quiz_title: string
  quiz_desc: string
  quiz_type: number
  created_at: Date
  id_section: number
}

export type UsersByQuizId = {
  data: UsersByQuizIdData[]
}

export type UsersByQuizIdData = {
  uuid: string
  id_quiz: number
  quiz_title: string
  username: string
}
