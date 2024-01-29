export type CategoryNavListRes = {
  code: number
  message: string
  data: CategoryNavDataListRes[]
}

export type CategoryNavDataListRes = {
  id_category: number
  category_name: string
  knowledge: NavbarKnowledge[]
}

export type NavbarKnowledge = {
  id_knowledge: number
  id_category: number
  knowledge_title: string
  description: string
}
