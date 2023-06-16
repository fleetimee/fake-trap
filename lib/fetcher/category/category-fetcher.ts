import { CategoryResponse } from "@/types/category-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"

/**
 * Enum representing the category URL endpoint.
 */
enum CaregoryUrl {
  category = "secure/category",
}

/**
 * Fetches category data from the server.
 * @param limit The maximum number of categories to fetch.
 * @returns A promise that resolves to the fetched category data.
 */
async function getCategory(limit: number): Promise<CategoryResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${CaregoryUrl.category}?limit=${limit}`,
    {
      method: "GET",
      headers: headersObj,
      cache: "no-cache",
    }
  )

  const data = await res.json()

  return data
}

export { getCategory }
