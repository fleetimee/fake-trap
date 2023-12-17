export type ApprovalOperatorLMSListRes = {
  code: number
  message: string
  data: ApprovalOperatorLMSListResData[]
  count: number
  page: number
  totalPage: number
}

export type ApprovalOperatorLMSListResData = {
  id_approval: number
  course_name: string
  approver_name: string
  approver_id: string
  requester_name: string
  requester_id: string
  status: string
  status_text: string
  created_at: Date
  updated_at: Date
}
