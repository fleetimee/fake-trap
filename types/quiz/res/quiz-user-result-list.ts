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
