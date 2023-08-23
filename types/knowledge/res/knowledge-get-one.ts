export type KnowledgeOneRes = {
  code: number
  message: string
  data: KnowledgeOneResData
}

export type KnowledgeOneResData = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: number
  image: string
  section: KnowledgeOneResSection[]
  id_category: number
  created_at: Date
  updated_at: Date
}

export type KnowledgeOneResSection = {
  id_section: number
  section_title: string
  content?: KnowledgeOneResContent[]
  created_at: Date
  updated_at: Date
}

export type KnowledgeOneResContent = {
  id_content: number
  content_title: string
  content_type: number
  image: string
  link: string
  id_section: number
  created_at: Date
  updated_at: Date
}
