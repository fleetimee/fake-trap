export interface ApprovalSupervisorLmsNotificationListRes {
  code: number
  message: string
  data: ApprovalSupervisorLmsNotificationListResData[]
}

export interface ApprovalSupervisorLmsNotificationListResData {
  id_approval_course: number
  id_course: number
  course_name: string
  image: string
  course_desc: string
  status: string
  status_name: string
  updated_at: string
  requester_name: string
}
