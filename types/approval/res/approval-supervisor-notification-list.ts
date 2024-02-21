export type ApprovalSupervisorNotificationListRes = {
  code: number
  message: string
  data: ApprovalSupervisorNotificationListResData[]
}

export type ApprovalSupervisorNotificationListResData = {
  id_approval_knowledge: number
  id_knowledge: number
  knowledge_title: string
  knowledge_image: string
  description: string
  status: string
  status_name: string
  updated_at: Date
  requester_name: string
}
