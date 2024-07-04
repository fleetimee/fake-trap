export interface QuizLeaderboardListRes {
  code: number
  message: string
  data: QuizLeaderboardListResData[]
  count: number
  page: number
  totalPage: number
}

export interface QuizLeaderboardListResData {
  position: number
  user_uuid: string
  name: string
  id_quiz: number
  score: number
  time_elapsed: string
  profile_picture: string
  earliest_created_at: string
}
