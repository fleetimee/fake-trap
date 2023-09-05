export type QuestionListRes = {
  code: number
  message: string
  data: QuestionListResData[]
  count: number
  page: number
  totalPage: number
}

export type QuestionListResData = {
  id_question: number
  id_quiz: number
  question_text: string
  answers: QuestionListResAnswer[]
}

export type QuestionListResAnswer = {
  id_answer: number
  id_question: number
  answer_text: string
  is_correct: boolean
}
