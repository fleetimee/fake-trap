/**
 * Represents a collection of knowledge data.
 */
export interface Knowledge {
  count: number
  data: KnowledgeData[]
  page: number
  totalPages: number
}

/**
 * Represents a knowledge data item.
 */
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

/**
 * Represents a course associated with a knowledge data item.
 */
export interface KnowledgeCourse {
  id_course: number
  id_knowledge: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
}

/**
 * Represents a section associated with a knowledge data item.
 */
export interface KnowledgeSection {
  id_section: number
  section_title: string
}

export type KnowledgeByIdResponse = {
  data: KnowledgeByIdData
}

export type KnowledgeByIdData = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: number
  image: string
  section: KnowledgeByIdSectionData[]
  course: KnowledgeByIdCourseData[]
  id_category: number
}

export type KnowledgeByIdCourseData = {
  id_course: number
  id_knowledge: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
}

export type KnowledgeByIdSectionData = {
  id_section: number
  section_title: string
  content: KnowledgeByIdSectionContentData[]
}

export type KnowledgeByIdSectionContentData = {
  id_content: number
  content_title: string
  content_type: number
  image: string
  link: string
  id_section: number
}
