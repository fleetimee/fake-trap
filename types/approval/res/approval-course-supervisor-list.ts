export type ApprovalCourseSpvListRes = {
  code: number
  message: string
  data: ApprovalCourseSpvListResData[]
  count: number
  page: number
  totalPage: number
}

export type ApprovalCourseSpvListResData = {
  id_course: number
  course_name: string
  user_request: string
  user_approver: string
  approved_at: Date
  status: string
  comment: string
  status_text: string
}
