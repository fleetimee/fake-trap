import { KnowledgeListRes, KnowledgeOneRes } from "@/types/knowledge/res"

interface GetOperatorKnowledgeProps {
  token: string
  limit: number
  page: number
  sortField?: string
  orderBy?: string
  searchQuery?: string
  visibilityId?: string | string[] | undefined
  categoryIds?: string | string[] | undefined
  statusCode?: string | string[] | undefined
  from?: string
  to?: string
}

export async function getOperatorKnowledge({
  token,
  limit,
  page,
  sortField = "id_knowledge",
  orderBy = "asc",
  searchQuery = "",
  categoryIds = "",
  visibilityId = "",
  statusCode = "",
  from = "",
  to = "",
}: GetOperatorKnowledgeProps): Promise<KnowledgeListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/v2`

  const urlObj = new URL(url)

  if (page) {
    urlObj.searchParams.append("page", page.toString())
  }

  if (limit) {
    urlObj.searchParams.append("limit", limit.toString())
  }

  if (sortField) {
    urlObj.searchParams.append("sortBy", sortField)
  }

  if (orderBy) {
    urlObj.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    urlObj.searchParams.append("searchQuery", searchQuery)
  }

  if (categoryIds) {
    if (Array.isArray(categoryIds)) {
      urlObj.searchParams.append("categoryIds", categoryIds.join("."))
    } else {
      urlObj.searchParams.append("categoryIds", categoryIds)
    }
  }

  if (visibilityId) {
    if (Array.isArray(visibilityId)) {
      urlObj.searchParams.append("visibility", visibilityId.join("."))
    } else {
      urlObj.searchParams.append("visibility", visibilityId)
    }
  }

  if (statusCode) {
    if (Array.isArray(statusCode)) {
      urlObj.searchParams.append("statusCodes", statusCode.join("."))
    } else {
      urlObj.searchParams.append("statusCodes", statusCode)
    }
  }

  if (from) {
    urlObj.searchParams.append("from", from)
  }

  if (to) {
    urlObj.searchParams.append("to", to)
  }

  try {
    const res = await fetch(urlObj.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
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

interface GetKnowledgeByCreatedByUser {
  userUuid: string
  token: string
  limit: number
  page: number
  sortField?: string
  orderBy?: string
  searchQuery?: string
  visibilityId?: string | string[] | undefined
  categoryIds?: string | string[] | undefined
  statusCode?: string | string[] | undefined
}

export async function getKnowledgeByCreatedByUser({
  userUuid,
  token,
  limit,
  page,
  sortField = "id_knowledge",
  orderBy = "asc",
  searchQuery = "",
  categoryIds = "",
  visibilityId = "",
  statusCode = "",
}: GetKnowledgeByCreatedByUser): Promise<KnowledgeListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/v2/by/${userUuid}`

  const urlObj = new URL(url)

  if (page) {
    urlObj.searchParams.append("page", page.toString())
  }

  if (limit) {
    urlObj.searchParams.append("limit", limit.toString())
  }

  if (sortField) {
    urlObj.searchParams.append("sortBy", sortField)
  }

  if (orderBy) {
    urlObj.searchParams.append("orderBy", orderBy)
  }

  if (searchQuery) {
    urlObj.searchParams.append("searchQuery", searchQuery)
  }

  if (categoryIds) {
    if (Array.isArray(categoryIds)) {
      urlObj.searchParams.append("categoryIds", categoryIds.join("."))
    } else {
      urlObj.searchParams.append("categoryIds", categoryIds)
    }
  }

  if (visibilityId) {
    if (Array.isArray(visibilityId)) {
      urlObj.searchParams.append("visibility", visibilityId.join("."))
    } else {
      urlObj.searchParams.append("visibility", visibilityId)
    }
  }

  if (statusCode) {
    if (Array.isArray(statusCode)) {
      urlObj.searchParams.append("statusCodes", statusCode.join("."))
    } else {
      urlObj.searchParams.append("statusCodes", statusCode)
    }
  }

  try {
    const res = await fetch(urlObj.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
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

interface GetKnowledgeUser {
  token: string | undefined
  page: number
  limit: number
  searchQuery?: string
  sortField?: string
  sortOrder?: string
  status?: string
}

export async function getKnowledgeUser({
  token,
  page,
  limit,
  searchQuery = "",
  sortField = "created_at",
  sortOrder = "desc",
  status = "0052",
}: GetKnowledgeUser): Promise<KnowledgeListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/v2/user`

  const url = new URL(baseUrl)

  if (page) {
    url.searchParams.append("page", page.toString())
  }

  if (limit) {
    url.searchParams.append("limit", limit.toString())
  }

  if (searchQuery) {
    url.searchParams.append("searchQuery", searchQuery)
  }

  if (sortField) {
    url.searchParams.append("sortBy", sortField)
  }

  if (sortOrder) {
    url.searchParams.append("orderBy", sortOrder)
  }

  if (status) {
    url.searchParams.append("status", status)
  }

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
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

interface GetOneKnowledgeProps {
  token: string
  idKnowledge: string
}

export async function getOneKnowledge({
  token,
  idKnowledge,
}: GetOneKnowledgeProps): Promise<KnowledgeOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    // if (!res.ok) {
    //   throw new Error(`Fetch request failed with status ${res.status}`)
    // }

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)
    throw error
  }
}

interface GetOnePublicKnowledgeProps {
  idKnowledge: number
}

export async function getOnePublicKnowledge({
  idKnowledge,
}: GetOnePublicKnowledgeProps): Promise<KnowledgeOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/public/knowledge/${idKnowledge}`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        ContentType: "application/json",
      },
      cache: "no-store",
    })

    {
      throw new Error(`Fetch request failed with status ${res.status}`)
    }

    return await res.json()
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)
    throw error
  }
}

interface LookupKnowledgeProps {
  token: string | undefined
  idKnowledge: number
}

export async function lookupKnowledge({
  token,
  idKnowledge,
}: LookupKnowledgeProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}/lookup`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface CreateKnowledgeProps {
  token: string | undefined
  body: BodyInit
}

export async function createKnowledge({ token, body }: CreateKnowledgeProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge`

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    })

    // if (!res.ok) {
    //   throw new Error(`Fetch request failed with status ${res.status}`)
    // }

    return res
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)
    throw error
  }
}

interface UpdateKnowledgeProps {
  token: string | undefined
  idKnowledge: string
  body: BodyInit
}

export async function updateKnowledge({
  token,
  idKnowledge,
  body,
}: UpdateKnowledgeProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}`

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    })

    // if (!res.ok) {
    //   throw new Error(`Fetch request failed with status ${res.status}`)
    // }

    return res
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)
    throw error
  }
}

interface DeleteKnowledgeProps {
  token: string | undefined
  idKnowledge: string
}

export async function deleteKnowledge({
  token,
  idKnowledge,
}: DeleteKnowledgeProps) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}`

  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      return false
    }

    return true
  } catch (error) {
    console.error(`Fetch request failed: ${error}`)
    throw error
  }
}
