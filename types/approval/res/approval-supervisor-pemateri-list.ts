export type ApprovalSupervisorPemateriListRes = {
  code: number
  message: string
  data: ApprovalSupervisorPemateriListResData[]
  count: number
  page: number
  totalPage: number
}

export type ApprovalSupervisorPemateriOneRes = {
  code: number
  message: string
  data: ApprovalSupervisorPemateriListResData
  count: number
  page: number
  totalPage: number
}

export type ApprovalSupervisorPemateriListResData = {
  id_approval: number
  id_knowledge: number
  knowledge_title: string
  comment: string
  status: string
  status_text: string
  created_at: Date
  updated_at: Date
  approved_at: Date
  approver_name: string
  approver_id: string
  approver_username: string
  requester_name: string
  requester_id: string
  requester_username: string
}
