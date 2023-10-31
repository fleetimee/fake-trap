export type ApprovalOneRes = {
  code: number
  message: string
  data: ApprovalOneResData
}

export type ApprovalOneResData = {
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
