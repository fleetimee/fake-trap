export interface Course {
  count: number
  data: CourseData[]
  page: number
  totalPages: number
}

export interface CourseData {
  id_course: number
  id_knowledge: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
  section: Section[]
}

export interface Section {
  id_section: number
  section_title: string
}
