export type KnowledgeListRes = {
  code: number
  message: string
  data: KnowledgeListResData[]
  count: number
  page: number
  totalPage: number
}

export type KnowledgeListResData = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: number
  image: string
  section?: KnowledgeListResSection[]
  id_category: number
  created_at: Date
  updated_at: Date
}

export type KnowledgeListResSection = {
  id_section: number
  section_title: string
  created_at: Date
  updated_at: Date
}
