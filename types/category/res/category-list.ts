export type CategoryListRes = {
  code: number
  message: string
  data: CategoryListResData[]
  count: number
  page: number
  totalPage: number
}

export type CategoryListResData = {
  id_category: number
  category_name: string
  created_at: Date
  updated_at: Date
  knowledge?: CategoryListResKnowledge[]
}

export type CategoryListResKnowledge = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: number
  image: string
  id_category: number
  created_at: Date
  updated_at: Date
}
