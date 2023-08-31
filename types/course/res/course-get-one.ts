export type CourseOneRes = {
  code: number
  message: string
  data: CourseOneResData
}

export type CourseOneResData = {
  id_course: number
  id_knowledge: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
  users: CourseOneResUser[]
  section: CourseOneResSection[]
  created_at: Date
  updated_at: Date
}

export type CourseOneResSection = {
  id_section: number
  section_title: string
  quiz: CourseOneResQuiz[]
  content: CourseOneResContent[]
  created_at: Date
  updated_at: Date
}

export type CourseOneResContent = {
  id_content: number
  content_title: string
  content_type: string
  image: string
  link: string
  id_section: number
  created_at: Date
  updated_at: Date
}

export type CourseOneResQuiz = {
  id_quiz: number
  quiz_title: string
  quiz_desc: string
  quiz_type: string
  created_at: Date
  id_section: number
}

export type CourseOneResUser = {
  uuid: string
  created_at: Date
  updated_at: Date
  deleted_at: null
  username: string
  email: string
  password: string
  last_login: Date
  user_quiz: null
}
