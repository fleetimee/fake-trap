export type UserEnrolledCourseListRes = {
  code: number
  message: string
  data: UserEnrolledCourseListResData[]
  count: number
  page: number
  totalPage: number
}

export type UserEnrolledCourseListResData = {
  id_course: number
  id_knowledge: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
  created_at: Date
  updated_at: Date
}
