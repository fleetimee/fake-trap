export type QuizUserResultListRes = {
  code: number
  message: string
  data: QuizUserResultListResData[]
}

export type QuizUserResultListResData = {
  id_question: number
  id_answer: number
  id_user_quiz: number
  user_uuid: string
  answer_text: string
  is_correct: boolean
  score: number
}

export type FetchUserQuizListRes = {
  code: number
  message: string
  data: FetchUserQuizListResData[]
  count: number
  page: number
  totalPage: number
}

export type FetchUserQuizListResData = {
  id_attempt: number
  id_quiz: number
  quiz_title: string
  user_name: string
  user_id: string
  user_username: string
  status: string
  status_text: string
  score: number
  created_at: Date
  updated_at: Date
}
