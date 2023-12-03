import { Knowledge, KnowledgeData } from "@/types/knowledge-res"





export type CategoryResponse = {
  count: number
  data: DataCategory[]
  page: number
  totalPages: number
}

export type DataCategory = {
  id_category: number
  category_name: string
  knowledge?: Knowledge[]
}

export type CategoryByID = {
  data: CategoryByIDData
}

export type CategoryByIDData = {
  id_category: number
  category_name: string
  knowledge: KnowledgeData[]
}
