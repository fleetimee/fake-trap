export type CategoryOneRes = {
  code: number
  message: string
  data: CategoryOneResData
}

export type CategoryOneResData = {
  id_category: number
  category_name: string
  knowledge: CategoryOneResKnowledge[]
  image: string
  created_at: Date
  updated_at: Date
  created_by: string
}

export type CategoryOneResKnowledge = {
  id_knowledge: number
  knowledge_title: string
  description: string
  status: string
  image: string
  id_category: number
  created_at: Date
  updated_at: Date
}

export type CategoryHighlight = {
  code: number
  message: string
  data: CategoryHighlightData
}

export type CategoryHighlightData = {
  latest_month: Date
  latest_month_category_count: string
  latest_month_percent_increase: string
  avg_categories_per_month: string
  most_active_creator_name: string
  most_active_creator_category_count: number
  category_creation_trend_month: Date
  category_creation_trend_category_count: number
  total_category_count: number
}
