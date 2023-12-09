export type ApprovalRequestList = {
  code: number
  message: string
  data: AprovalRequestListData[]
  count: number
  page: number
  totalPage: number
}

export type AprovalRequestListData = {
  id_approval: number
  knowledge_title: string
  approver_name: string
  approver_id: string
  requester_name: string
  requester_id: string
  status: string
  status_text: string
  created_at: Date
  updated_at: Date
}
