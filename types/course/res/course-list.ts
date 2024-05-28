export type CourseListRes = {
  code: number
  message: string
  data: CourseListResData[]
  count: number
  page: number
  totalPage: number
}

export type CourseListResData = {
  id_course: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
  created_at: Date
  updated_at: Date
  status_code: string
  status_text: string
  comment: string
  user_uuid_approver: string
  user_uuid_request: string
  user_approver: string
  user_request: string
  user_created_by: string
  user_updated_by: string
}

export type CourseKnowledgeListRes = {
  code: number
  message: string
  data: CourseKnowledgeListResData[]
  count: number
  page: number
  totalPage: number
}

export type CourseKnowledgeListResData = {
  id_course: number
  id_knowledge: number
  image: string
  description: string
  knowledge_title: string
}
