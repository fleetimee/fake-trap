import {
  CourseGetNewRes,
  CourseKnowledgeListRes,
  CourseKnowledgeSectionListRes,
  CourseListRes,
  CourseOneRes,
  CourseVacantUserListRes,
} from "@/types/course/res"
import { UserListRes } from "@/types/user/res"

interface GetCourseProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  statusText?: string | string[] | undefined // Add this line
  from?: string
  to?: string
}

export async function getCourse({
  token,
  page,
  limit,
  sortBy = "id_course",
  orderBy = "asc",
  searchQuery = "",
  statusText = "",
  from = "",
  to = "",
}: GetCourseProps): Promise<CourseListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/v2?`

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

  if (statusText) {
    if (Array.isArray(statusText)) {
      url = `${url}&status=${statusText.join(".")}`
    } else {
      url = `${url}&status=${statusText}`
    }
  }

  if (from) {
    url = `${url}&from=${from}`
  }

  if (to) {
    url = `${url}&to=${to}`
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error("Failed to fetch course")
    // }

    return await res.json()
  } catch (err) {
    console.error(`Fetch request failed: ${err}`)

    throw err
  }
}

interface GetCourseUser {
  token: string | undefined
  idCourse: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

export async function getCourseUsers({
  token,
  idCourse,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetCourseUser): Promise<UserListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/users?`

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
    //   throw new Error("Failed to fetch course")
    // }

    return await res.json()
  } catch (err) {
    console.error(`Fetch request failed: ${err}`)

    throw err
  }
}

interface GetCourseVacantUserProps {
  token: string | undefined
  idCourse: string
}

export async function getCourseVacantUser({
  token,
  idCourse,
}: GetCourseVacantUserProps): Promise<CourseVacantUserListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/getVacantUser`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error("Failed to fetch course")
    // }

    return await res.json()
  } catch (err) {
    console.error(`Fetch request failed: ${err}`)

    throw err
  }
}

interface GetCourseKnowledges {
  token: string | undefined
  idCourse: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

export async function getCourseKnowledges({
  token,
  idCourse,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetCourseKnowledges): Promise<CourseKnowledgeListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/getKnowledge`
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    cache: "no-cache",
  })

  return await res.json()
}

interface GetCourseKnowledgeSectionProps {
  token: string | undefined
  idCourse: string
}

export async function getCourseKnowledgeSection({
  token,
  idCourse,
}: GetCourseKnowledgeSectionProps): Promise<CourseKnowledgeSectionListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/section`

  const res = await fetch(baseUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    cache: "no-cache",
  })

  return await res.json()
}

interface GetOneCourseProps {
  token: string | undefined
  idCourse: string
}

export async function getOneCourse({
  token,
  idCourse,
}: GetOneCourseProps): Promise<CourseOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    return await res.json()
  } catch (err) {
    console.error(`Fetch request failed: ${err}`)

    throw err
  }
}

interface GetNewCourseProps {
  token: string | undefined
}

export async function getNewestCourse({
  token,
}: GetNewCourseProps): Promise<CourseGetNewRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/new`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    cache: "no-cache",
  })

  return await res.json()
}

interface LookupCourseProps {
  token: string | undefined
  idCourse: string
}

export async function getLookupCourseDetails({
  token,
  idCourse,
}: LookupCourseProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/lookup`

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    // if (!res.ok) {
    //   throw new Error("Failed to fetch course")
    // }

    return await res.json()
  } catch (err) {
    console.error(`Fetch request failed: ${err}`)

    throw err
  }
}

interface CreateCourseProps {
  token: string | undefined
  body: BodyInit
}

export async function createCourse({ token, body }: CreateCourseProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return response
}

interface UpdateCourseProps {
  token: string | undefined
  idCourse: number
  body: BodyInit
}

export async function updateCourse({
  token,
  idCourse,
  body,
}: UpdateCourseProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}`

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })

  return response
}

interface UpdateCoursePesertaProps {
  token: string | undefined
  idCourse: string
  body: BodyInit
}

export async function updateCoursePeserta({
  token,
  idCourse,
  body,
}: UpdateCoursePesertaProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/users`

  return await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })
}

interface UpdateCourseKnowledgesProps {
  token: string | undefined
  idCourse: string
  body: BodyInit
}

export async function updateCourseKnowledges({
  token,
  idCourse,
  body,
}: UpdateCourseKnowledgesProps) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/knowledges`

  return await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: body,
  })
}
