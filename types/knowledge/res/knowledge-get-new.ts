export type KnowledgeGetNewRes = {
  code: number
  message: string
  data: KnowledgeGetNewResData
}

export type KnowledgeGetNewResData = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: number
  image: string
  id_category: number
  created_at: Date
  updated_at: Date
}
