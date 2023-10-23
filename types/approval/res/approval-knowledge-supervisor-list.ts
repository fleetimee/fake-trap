export type ApprovalKnowledgeSpvListRes = {
  code: number
  message: string
  data: ApprovalKnowledgeSpvListResData[]
  count: number
  page: number
  totalPage: number
}

export type ApprovalKnowledgeSpvListResData = {
  id_knowledge: number
  knowledge_title: string
  user_request: string
  user_approver: string
  approved_at: Date
  status: string
  comment: string
  status_text: string
}
