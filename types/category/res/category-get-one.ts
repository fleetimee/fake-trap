export type CategoryOneRes = {
  code: number
  message: string
  data: CategoryOneResData
}

export type CategoryOneResData = {
  id_category: number
  category_name: string
  knowledge: CategoryOneResKnowledge[]
  created_at: Date
  updated_at: Date
}

export type CategoryOneResKnowledge = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: number
  image: string
  id_category: number
  created_at: Date
  updated_at: Date
}