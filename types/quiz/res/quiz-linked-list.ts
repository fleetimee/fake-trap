export type QuizLinkedList = {
  code: number
  message: string
  data: QuizLinkedListData
}

export type QuizLinkedListData = {
  id_course: number
  course_name: string
  quiz_title: string
  quiz_desc: string
  created_at: Date
}
