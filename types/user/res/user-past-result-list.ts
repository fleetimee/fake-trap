export type UserPastResultListRes = {
  code: number
  message: string
  data: UserPastResultListResData[]
}

export type UserPastResultListResData = {
  id_course: number
  course_name: string
  image: string
  created_at: Date
  updated_at: Date
  pretest_result: UserPastResultListResTestResult[]
  posttest_result: UserPastResultListResTestResult[]
}

export type UserPastResultListResTestResult = {
  id_user_quiz: number
  quiz_title: string
  quiz_type: string
  score: number
  selected_answers: { [key: string]: number }
  created_at: Date
}
