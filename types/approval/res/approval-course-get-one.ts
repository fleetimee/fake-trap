export type ApprovalCourseOneRes = {
  code: number
  message: string
  data: ApprovalCourseOneResData
}

export type ApprovalCourseOneResData = {
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
