export type QuizQuestionListRes = {
  code: number
  message: string
  data: QuizQuestionListResData[]
}

export type QuizQuestionListResData = {
  id_question: number
  id_quiz: number
  question_text: string
  answers: QuizQuestionListResAnswer[]
}

export type QuizQuestionListResAnswer = {
  id_answer: number
  id_question: number
  answer_text: string
  is_correct: boolean
}
