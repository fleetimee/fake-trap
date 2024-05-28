export type KnowledgeListRes = {
  code: number
  message: string
  data: KnowledgeListResData[]
  count: number
  page: number
  totalPage: number
}

export type KnowledgeListResData = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: string
  image: string
  id_category: number
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

export type KnowledgeListResSection = {
  id_section: number
  section_title: string
  created_at: Date
  updated_at: Date
}
