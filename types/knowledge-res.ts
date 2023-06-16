export interface Knowledge {
  count: number
  data: KnowledgeData[]
  page: number
  totalPages: number
}

export interface KnowledgeData {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: number
  image: string
  section: KnowledgeSection[]
  course?: KnowledgeCourse[]
  id_category: number
}

export interface KnowledgeCourse {
  id_course: number
  id_knowledge: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
}

export interface KnowledgeSection {
  id_section: number
  section_title: string
}
