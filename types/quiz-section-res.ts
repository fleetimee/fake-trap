export type QuizSectionResp = {
  data: QuizSectionRespData
}

export type QuizSectionRespData = {
  id_section: number
  section_title: string
  course: QuizSectionRespCourse[]
  content: QuizSectionRespContent[]
}

export type QuizSectionRespContent = {
  id_content: number
  content_title: string
  content_type: number
  image: string
  link: string
  id_section: number
}

export type QuizSectionRespCourse = {
  id_course: number
  id_knowledge: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
}
