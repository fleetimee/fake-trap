export interface NewestCourse {
  data: Data
}

export interface Data {
  id_course: number
  id_knowledge: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
}
