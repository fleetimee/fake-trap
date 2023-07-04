import { CategoryResponse } from "@/types/category-res"
import { Course, CourseByIdResponse } from "@/types/course-res"
import { Knowledge, KnowledgeByIdResponse } from "@/types/knowledge-res"

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

async function getKnowledgeDataById(props: {
  id: number
  token: string | undefined
}): Promise<KnowledgeByIdResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${props.id}`,
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

async function getPaginatedCourseData(props: {
  limit: number
  page: number
  token: string | undefined
}): Promise<Course> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course?limit=${props.limit}&page=${props.page}`,
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
    throw new Error("Failed to fetch course data")
  }
}

async function getCourseDataById(props: {
  id: string
  token: string | undefined
}): Promise<CourseByIdResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${props.id}`,
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
    throw new Error("Failed to fetch course data")
  }
}

async function getAllUsersData(props: { token: string | undefined }) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users`,
      {
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
    throw new Error("Failed to fetch users data")
  }
}

export {
  getPaginatedKnowledgeData,
  getAllCategoriesData,
  getKnowledgeDataById,
  getPaginatedCourseData,
  getCourseDataById,
  getAllUsersData,
}