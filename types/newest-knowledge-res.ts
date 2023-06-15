export interface NewestKnowledge {
  data: NewestKnowledgeData
}

export interface NewestKnowledgeData {
  id_course: number
  id_knowledge: number
  course_name: string
  course_desc: string
  image: string
  date_start: Date
  date_end: Date
}
