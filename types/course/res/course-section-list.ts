export type CourseKnowledgeSectionListRes = {
  code: number
  message: string
  data: CourseKnowledgeSectionListResData[]
}

export type CourseKnowledgeSectionListResData = {
  id_knowledge: number
  knowledge_title: string
  created_at: Date
  section: CourseKnowledgeSectionListResSection[] | null
}

export type CourseKnowledgeSectionListResSection = {
  id_section: number
  section_title: string
  content?: CourseKnowledgeSectionListResSectionContent[]
  created_at: Date
  updated_at: Date
}

export type CourseKnowledgeSectionListResSectionContent = {
  id_content: number
  content_title: string
  content_type: string
  image: string
  link: string
  id_section: number
  created_at: Date
  updated_at: Date
  files: null
  article: null
  video: null
}
