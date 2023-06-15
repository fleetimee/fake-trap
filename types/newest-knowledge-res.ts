export type NewestKnowledge = {
  data: NewestKnowledgeData
}

export type NewestKnowledgeData = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: number
  image: string
  id_category: number
}
