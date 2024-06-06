export type UserPastCourseKnowledgeListRes = {
  code: number
  message: string
  data: UserPastCourseKnowledgeListResData[]
}

export type UserPastCourseKnowledgeListResData = {
  id_knowledge: number
  knowledge_title: string
  description: string
  image: string
  created_at: Date
  updated_at: Date
}
