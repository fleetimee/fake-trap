export type SectionOneRes = {
  code: number
  message: string
  data: SectionOneResData
}

export type SectionOneResData = {
  id_section: number
  section_title: string
  knowledge: SectionOneResKnowledge[]
  created_at: Date
  updated_at: Date
}

export type SectionOneResKnowledge = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: string
  image: string
  id_category: number
  created_at: Date
  updated_at: Date
  created_by: string
  updated_by: string
}
