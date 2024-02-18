export type QuizOneRes = {
  code: number
  message: string
  data: QuizOneResData
}

export type QuizOneResData = {
  id_quiz: number
  quiz_title: string
  quiz_desc: string
  quiz_type: string
  time_limit: number
  created_at: Date
  questions: QuizOneResQuestion[]
  id_section: number
  created_by: string
  updated_by: string
}

export type QuizOneResQuestion = {
  id_question: number
  id_quiz: number
  question_text: string
  answers: QuizOneResAnswer[]
}

export type QuizOneResAnswer = {
  id_answer: number
  id_question: number
  answer_text: string
  is_correct: boolean
}
