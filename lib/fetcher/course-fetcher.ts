import { CourseListRes, CourseOneRes } from "@/types/course/res"

interface GetCourseProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  statusText?: string | string[] | undefined // Add this line
}

export async function getCourse({
  token,
  page,
  limit,
  sortBy = "id_course",
  orderBy = "asc",
  searchQuery = "",
  statusText = "",
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

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch course")
    }

    return await res.json()
  } catch (err) {
    console.error(`Fetch request failed: ${err}`)

    throw err
  }
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

    if (!res.ok) {
      throw new Error("Failed to fetch course")
    }

    return await res.json()
  } catch (err) {
    console.error(`Fetch request failed: ${err}`)

    throw err
  }
}
