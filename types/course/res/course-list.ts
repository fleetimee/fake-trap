export type CourseListRes = {
  code: number
  message: string
  data: CourseListResData[]
  count: number
  page: number
  totalPage: number
}

export type CourseListResData = {
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
