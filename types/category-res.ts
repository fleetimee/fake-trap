import { Knowledge, KnowledgeData } from "@/types/knowledge-res"

/**
 * Represents the response data for a category request, including the total count of categories,
 * an array of `DataCategory` objects, the current page number, and the total number of pages.
 */
export type CategoryResponse = {
  /** The total count of categories returned in the response. */
  count: number
  /** An array of `DataCategory` objects containing the category data. */
  data: DataCategory[]
  /** The current page number of the response. */
  page: number
  /** The total number of pages in the response. */
  totalPages: number
}

/**
 * Represents the data for a category, including its ID, name, and associated knowledge.
 */
export type DataCategory = {
  /** The unique identifier for the category. */
  id_category: number
  /** The name of the category. */
  category_name: string
  /** The knowledge associated with the category. */
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
