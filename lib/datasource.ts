import { CategoryByID, CategoryResponse } from "@/types/category-res"
import { Course, CourseByIdResponse } from "@/types/course-res"
import { Knowledge, KnowledgeByIdResponse } from "@/types/knowledge-res"
import { UserByQuizIDCount, UsersByQuizID } from "@/types/quiz-by-id-res"
import { QuizData, QuizRes, UsersByQuizId } from "@/types/quiz-res"
import { QuizSectionResp } from "@/types/quiz-section-res"
import { UserResponse } from "@/types/user-res"

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

async function getPublicKnowledgeData(props: {
  limit: number
  page: number
}): Promise<Knowledge> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/public/knowledge?limit=${props.limit}&page=${props.page}`,
      {
        headers: {
          "Content-Type": "application/json",
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

async function getPublicKnowledgeDataById(props: {
  id: number
}): Promise<KnowledgeByIdResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/public/knowledge/${props.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

async function getPublicCategoriesData(props: {
  limit: number
  page: number
}): Promise<CategoryResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/public/category/?limit=${props.limit}&page=${props.page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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

async function getPublicCategoriesDataById(props: {
  id: number
}): Promise<CategoryByID> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/public/category/${props.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
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

async function getAllUsersData(props: {
  token: string | undefined
}): Promise<UserResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users`,
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
    throw new Error("Failed to fetch users data")
  }
}

async function getAllQuizData(props: {
  token: string | undefined
}): Promise<QuizRes> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz`,
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
    throw new Error("Failed to fetch quiz data")
  }
}

async function getQuizById(props: {
  id: string
  token: string | undefined
}): Promise<UsersByQuizID> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${props.id}`,
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
    throw new Error("Failed to fetch quiz data")
  }
}

async function getAllQuizDataWithNullSection(props: {
  token: string | undefined
}): Promise<QuizRes> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz?isNullSection=true`,
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
    throw new Error("Failed to fetch quiz data")
  }
}

async function getUsersQuizById(props: {
  id: string
  token: string | undefined
}): Promise<UsersByQuizId> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${props.id}/users`,
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
    throw new Error("Failed to get users by quiz id")
  }
}

async function getUsersQuizCountById(props: {
  id: string
  token: string | undefined
}): Promise<UserByQuizIDCount> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${props.id}/users/count`,
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
    throw new Error("Failed to get users by quiz id")
  }
}

async function getSectionByIdForQuiz(props: {
  id: string
  token: string | undefined
}): Promise<QuizSectionResp> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${props.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    )

    if (response.status === 404) {
      return {
        data: {
          id_section: 0,
          section_title: "No Section",
          course: [],
          content: [],
        },
      }
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    throw new Error("Failed to get section by id")
  }
}

export {
  getPaginatedKnowledgeData,
  getPublicKnowledgeData,
  getPublicKnowledgeDataById,
  getAllCategoriesData,
  getPublicCategoriesData,
  getPublicCategoriesDataById,
  getKnowledgeDataById,
  getPaginatedCourseData,
  getCourseDataById,
  getAllUsersData,
  getAllQuizDataWithNullSection,
  getAllQuizData,
  getQuizById,
  getUsersQuizById,
  getUsersQuizCountById,
  getSectionByIdForQuiz,
}
