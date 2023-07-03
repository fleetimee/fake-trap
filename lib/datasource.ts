import { CategoryResponse } from "@/types/category-res"
import { Knowledge } from "@/types/knowledge-res"

async function getPaginatedKnowledgeData(props: {
  limit: number
  page: number
  token: string | undefined
}): Promise<Knowledge> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge?limit=${props.limit}&page=${props.page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch knowledge data")
  }
}

async function getAllCategoriesData(props: {
  token: string | undefined
}): Promise<CategoryResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    throw new Error("Failed to fetch categories data")
  }
}

export { getPaginatedKnowledgeData, getAllCategoriesData }
