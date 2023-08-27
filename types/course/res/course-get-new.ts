export type CourseGetNewRes = {
  code: number
  message: string
  data: CourseGetNewResData
}

export type CourseGetNewResData = {
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
