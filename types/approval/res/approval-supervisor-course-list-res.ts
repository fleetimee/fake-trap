export type ApprovalSupervisorCourseListRes = {
  code: number
  message: string
  data: ApprovalSupervisorCourseListResData[]
  count: number
  page: number
  totalPage: number
}

export type ApprovalSupervisorCourseOneRes = {
  code: number
  message: string
  data: ApprovalSupervisorCourseListResData
}

export type ApprovalSupervisorCourseListResData = {
  id_approval: number
  id_course: number
  course_name: string
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
