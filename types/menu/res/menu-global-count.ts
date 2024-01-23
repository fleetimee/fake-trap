export type GlobalCountRes = {
  code: number
  message: string
  data: GlobalCountResData
}

export type GlobalCountResData = {
  knowledge_count: number
  category_count: number
  quiz_count: number
  course_count: number
}
