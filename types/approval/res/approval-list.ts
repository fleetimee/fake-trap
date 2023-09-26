export type ApprovalListRes = {
  code: number
  message: string
  data: ApprovalListResData[]
  count: number
  page: number
  totalPage: number
}

export type ApprovalListResData = {
  id_approval_course: number
  user_uuid_aprover: string
  id_course: number
  comment: string
  created_at: Date
  updated_at: Date
  user_uuid_request: string
  approved_at: Date
  status: string
  status_text: string
  course_name: string
  user_approver: string
  user_request: string
}

export type ApprovalKnowledgeListRes = {
  code: number
  message: string
  data: ApprovalKnowledgeListResData[]
  count: number
  page: number
  totalPage: number
}

export type ApprovalKnowledgeListResData = {
  id_approval_knowledge: number
  user_uuid_aprover: string
  id_knowledge: number
  comment: string
  created_at: Date
  updated_at: Date
  user_uuid_request: string
  approved_at: Date
  status: string
  status_text: string
  knowledge_title: string
  user_approver: string
  user_request: string
}
