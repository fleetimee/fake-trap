import { ThreadListRes, ThreadOneRes } from "@/types/threads/res"

interface GetThreadsListProps {
  idCourse: string
  token: string | undefined
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

export async function getThreadList({
  idCourse,
  token,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetThreadsListProps): Promise<ThreadListRes> {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/threads`
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

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetOneThreadProps {
  token: string | undefined
  idThreads: string
}

export async function getOneThread({
  token,
  idThreads,
}: GetOneThreadProps): Promise<ThreadOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/${idThreads}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface CreateThreadProps {
  token: string | undefined
  body: BodyInit
}

export async function createThread({ token, body }: CreateThreadProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/threads/`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return res
}

interface DeleteThreadProps {
  token: string | undefined
  idThreads: string
}

export async function deleteThread({ token, idThreads }: DeleteThreadProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/${idThreads}`

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res
}
