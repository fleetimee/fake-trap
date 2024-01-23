export type QuizDashboardCountRes = {
  code: number
  message: string
  data: QuizDashboardCountResData
}

export type QuizDashboardCountResData = {
  total_quiz_count: number
  pretest_quiz_count: number
  posttest_quiz_count: number
  recent_quiz: string
}
