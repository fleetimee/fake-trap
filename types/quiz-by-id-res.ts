export type UsersByQuizID = {
  data: UsersByQuizIDData
}

export type UsersByQuizIDData = {
  id_quiz: number
  quiz_title: string
  quiz_desc: string
  quiz_type: number
  created_at: Date
  questions: UsersByQuizIDQuestion[]
  id_section: number
}

export type UsersByQuizIDQuestion = {
  id_question: number
  id_quiz: number
  question_text: string
  answers: UsersByQuizIDAnswer[]
}

export type UsersByQuizIDAnswer = {
  id_answer: number
  id_question: number
  answer_text: string
  is_correct: boolean
}

export type UserByQuizIDCount = {
  data: UserByQuizIDCountData
}

export type UserByQuizIDCountData = {
  count: number
}
