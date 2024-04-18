export type QuizUserAttemptList = {
  code: number
  message: string
  data: QuizUserAttemptListData[]
  count: number
  page: number
  totalPage: number
}

export type QuizUserAttemptListData = {
  id_quiz: number
  id_user_quiz: number
  user_uuid: string
  name: string
  username: string
  quiz_type: string
  is_correct: boolean
  created_at: Date
  score: number
  profile_picture: string
}
