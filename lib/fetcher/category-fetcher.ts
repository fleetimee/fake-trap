import { CategoryListRes, CategoryOneRes } from "@/types/category/res"
import { KnowledgeListRes } from "@/types/knowledge/res"

interface GetCategoryProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

export async function getOperatorCategory({
  token,
  page,
  limit,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetCategoryProps): Promise<CategoryListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category`

  const urlObj = new URL(url)

  if (page) {
    urlObj.searchParams.append("page", page.toString())
  }

  if (limit) {
    urlObj.searchParams.append("limit", limit.toString())
  }

  if (sortBy) {
    urlObj.searchParams.append("sortBy", sortBy)
  }

  if (orderBy) {
    urlObj.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    urlObj.searchParams.append("searchQuery", searchQuery)
  }

  url = urlObj.toString()

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error("Failed to fetch category")
    // }

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface GetCategoryByCreatorProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  createdBy?: string
}

export async function getCategoryByCreator({
  token,
  page,
  limit,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  createdBy = "",
}: GetCategoryByCreatorProps): Promise<CategoryListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/by/${createdBy}`

  const urlObj = new URL(url)

  if (page) {
    urlObj.searchParams.append("page", page.toString())
  }

  if (limit) {
    urlObj.searchParams.append("limit", limit.toString())
  }

  if (sortBy) {
    urlObj.searchParams.append("sortBy", sortBy)
  }

  if (orderBy) {
    urlObj.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    urlObj.searchParams.append("searchQuery", searchQuery)
  }

  url = urlObj.toString()

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error("Failed to fetch category")
    // }

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface GetCategoryWithKnowledge {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

export async function getCategoriesWithKnowledge({
  token,
  page,
  limit,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetCategoryWithKnowledge): Promise<CategoryListRes> {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/haveKnowledge`
  const url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (sortBy) {
    url.searchParams.append("sortBy", sortBy)
  }

  if (orderBy) {
    url.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    url.searchParams.append("searchQuery", searchQuery)
  }

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error("Failed to fetch category")
    // }

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface GetCategoryKnowledge {
  token: string | undefined
  idCategory: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

export async function getCategoryKnowledge({
  token,
  idCategory,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetCategoryKnowledge): Promise<KnowledgeListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/fetchKnowledge/${idCategory}`

  const url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (sortBy) {
    url.searchParams.append("sortBy", sortBy)
  }

  if (orderBy) {
    url.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    url.searchParams.append("searchQuery", searchQuery)
  }

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error("Failed to fetch category")
    // }

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface GetOneCategoryProps {
  token: string | undefined
  idCategory: string
}

export async function getOneCategory({
  token,
  idCategory,
}: GetOneCategoryProps): Promise<CategoryOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/${idCategory}`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error(`HTTP error! status: ${res.status}`)
    // }

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface CreateCategoryProps {
  token: string | undefined
  body: BodyInit
}

export async function createCategory({ token, body }: CreateCategoryProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category`

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    })

    // if (!res.ok) {
    //   throw new Error("Failed to create category")
    // }

    return res
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface UpdateCategoryProps {
  token: string | undefined
  idCategory: string
  body: BodyInit
}

export async function updateCategory({
  token,
  idCategory,
  body,
}: UpdateCategoryProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/${idCategory}`

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body,
    })

    // if (!res.ok) {
    //   throw new Error("Failed to update category")
    // }

    return res
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}

interface DeleteCategoryProps {
  token: string | undefined
  idCategory: string
}

export async function deleteCategory({
  token,
  idCategory,
}: DeleteCategoryProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/${idCategory}`

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // if (!res.ok) {
    //   return false
    // }

    return true
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)

    throw error
  }
}
