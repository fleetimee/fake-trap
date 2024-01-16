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
  image: string
  total_knowledge: number
  created_by: string
}
