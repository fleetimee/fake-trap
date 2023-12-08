import { CategoryListRes, CategoryOneRes } from "@/types/category/res"
import { ContentOneRes } from "@/types/content/res"
import {
  CourseListRes,
  CourseOneRes,
  CourseVacantUserListRes,
} from "@/types/course/res"
import { KnowledgeListRes, KnowledgeOneRes } from "@/types/knowledge/res"
import { UserEnrolledCourseListRes } from "@/types/me/res"
import { MenuListResNew } from "@/types/menu/res"
import { PostsListRes } from "@/types/posts/res"
import {
  QuizLinkedList,
  QuizListRes,
  QuizMemberListRes,
  QuizOneRes,
  QuizOneUserCountRes,
  QuizQuestionListRes,
  QuizUserAttemptList,
  QuizUserResultListRes,
} from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { RoleListRes } from "@/types/role/res"
import { RuleOneRes } from "@/types/rule/res"
import { SectionOneRes } from "@/types/section/res"
import { ThreadListRes, ThreadOneRes } from "@/types/threads/res"
import { UserListRes, UserOneRes, UserRoleListRes } from "@/types/user/res"

interface GetUserProps {
  token: string | undefined
  uuid: string
}

/**
 * Retrieves a logged on user.
 * @param {GetUserProps} props - The properties needed to retrieve the user.
 * @param {string} props.token - The user's token.
 * @param {string} props.uuid - The user's UUID.
 * @returns {Promise<UserOneRes>} - A promise that resolves to the user's data.
 */
export async function getLoggedOnUser({
  token,
  uuid,
}: GetUserProps): Promise<UserOneRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return res.json()
}

interface GetExerciseUserSelectedAnswerProps {
  token: string | undefined
  idAttempt: string
  userUuid: string
}

/**
 * Retrieves the user-selected answer for a specific exercise attempt.
 * @param token - The authentication token.
 * @param idAttempt - The ID of the exercise attempt.
 * @param userUuid - The UUID of the user.
 * @returns A promise that resolves to the user-selected answer for the exercise attempt.
 */
export async function getExerciseUserSelectedAnswer({
  token,
  idAttempt,
  userUuid,
}: GetExerciseUserSelectedAnswerProps): Promise<QuizUserResultListRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${userUuid}/getSelectedAnswer/${idAttempt}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetCategoryProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

/**
 * Retrieves a list of categories based on the provided parameters.
 * @param {GetCategoryProps} props - The parameters for the category list request.
 * @returns {Promise<CategoryListRes>} - A promise that resolves to the category list response.
 */
export async function getOperatorCategory({
  token,
  page,
  limit,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetCategoryProps): Promise<CategoryListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
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

/**
 * Retrieves a list of categories based on the creator.
 * @param token - The authentication token.
 * @param page - The page number.
 * @param limit - The maximum number of categories to retrieve per page.
 * @param sortBy - The field to sort the categories by. Defaults to "created_at".
 * @param orderBy - The order in which to sort the categories. Defaults to "desc".
 * @param searchQuery - The search query to filter the categories.
 * @param createdBy - The creator of the categories.
 * @returns A promise that resolves to the list of categories.
 */
export async function getCategoryByCreator({
  token,
  page,
  limit,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
  createdBy = "",
}: GetCategoryByCreatorProps): Promise<CategoryListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/by/${createdBy}?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetCategoryByCreatorProps {
  token: string | undefined
  page: number
  limit: number
}

/**
 * Retrieves a list of categories.
 * @param {GetCategoryByCreatorProps} options - The options for fetching the category list.
 * @returns {Promise<CategoryListRes>} - A promise that resolves to the category list response.
 */
export async function getListCategory({
  token,
  page,
  limit,
}: GetCategoryByCreatorProps): Promise<CategoryListRes> {
  const categoryList = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await categoryList.json()
}

interface GetCategoryWithKnowledge {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

/**
 * Retrieves a list of categories with associated knowledge.
 *
 * @param token - The authentication token.
 * @param page - The page number to retrieve.
 * @param limit - The maximum number of categories to retrieve per page.
 * @param sortBy - The field to sort the categories by. Defaults to "created_at".
 * @param orderBy - The order in which to sort the categories. Defaults to "desc".
 * @param searchQuery - The search query to filter the categories.
 * @returns A promise that resolves to a CategoryListRes object containing the list of categories.
 */
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

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
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

/**
 * Retrieves a list of knowledge items for a specific category.
 *
 * @param {GetCategoryKnowledge} options - The options for fetching category knowledge.
 * @returns {Promise<KnowledgeListRes>} - A promise that resolves to the list of knowledge items.
 */
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

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetOneCategoryProps {
  token: string | undefined
  idCategory: string
}

/**
 * Retrieves a single category from the server.
 * @param {GetOneCategoryProps} options - The options for retrieving the category.
 * @returns {Promise<CategoryOneRes>} - A promise that resolves to the category response.
 */
export async function getOneCategory({
  token,
  idCategory,
}: GetOneCategoryProps): Promise<CategoryOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/${idCategory}`

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

interface GetKnowledgeV2Props {
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

/**
 * Retrieves a list of knowledge items based on the provided parameters.
 * @param token - The authentication token.
 * @param limit - The maximum number of knowledge items to retrieve per page.
 * @param page - The page number of the knowledge items to retrieve.
 * @param sortField - The field to sort the knowledge items by. Defaults to "id_knowledge".
 * @param orderBy - The order in which to sort the knowledge items. Defaults to "asc".
 * @param searchQuery - The search query to filter the knowledge items.
 * @param categoryIds - The category IDs to filter the knowledge items by.
 * @param visibilityId - The visibility ID to filter the knowledge items by.
 * @param statusCode - The status code to filter the knowledge items by.
 * @returns A promise that resolves to a KnowledgeListRes object containing the retrieved knowledge items.
 */
export async function getKnowledgeV2({
  token,
  limit,
  page,
  sortField = "id_knowledge",
  orderBy = "asc",
  searchQuery = "",
  categoryIds = "",
  visibilityId = "",
  statusCode = "",
}: GetKnowledgeV2Props): Promise<KnowledgeListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/v2/?page=${page}&limit=${limit}&sortBy=${sortField}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  // If categoryIds is provided, add it to the URL
  if (categoryIds) {
    url += `&categoryIds=${categoryIds}`
  }

  if (visibilityId) {
    url += `&visibility=${visibilityId}`
  }

  if (statusCode) {
    url += `&statusCodes=${statusCode}`
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
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
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/v2/user/`

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
    url.searchParams.append("sortField", sortField)
  }

  if (sortOrder) {
    url.searchParams.append("sortOrder", sortOrder)
  }

  if (status) {
    url.searchParams.append("status", status)
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetKnowledgeByCreatedBy {
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

export async function getKnowledgeByCreatedBy({
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
}: GetKnowledgeByCreatedBy): Promise<KnowledgeListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/v2/by/${userUuid}?page=${page}&limit=${limit}&sortBy=${sortField}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  // If categoryIds is provided, add it to the URL
  if (categoryIds) {
    url += `&categoryIds=${categoryIds}`
  }

  if (visibilityId) {
    url += `&visibility=${visibilityId}`
  }

  if (statusCode) {
    url += `&statusCodes=${statusCode}`
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetOneKnowledgeProps {
  token: string
  idKnowledge: string
}

/**
 * Retrieves a single knowledge item from the server.
 * @param {GetOneKnowledgeProps} options - The options for fetching the knowledge item.
 * @param {string} options.token - The authentication token.
 * @param {string} options.idKnowledge - The ID of the knowledge item to fetch.
 * @returns {Promise<any>} - A promise that resolves to the fetched knowledge item.
 */
export async function getOneKnowledge({
  token,
  idKnowledge,
}: GetOneKnowledgeProps): Promise<KnowledgeOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}`

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

interface GetOneSectionProps {
  token: string | undefined
  idSection: string
}

/**
 * Retrieves a single section from the server.
 * @param {GetOneSectionProps} options - The options for retrieving the section.
 * @param {string} options.token - The authentication token.
 * @param {string} options.idSection - The ID of the section to retrieve.
 * @returns {Promise<any>} - A promise that resolves to the JSON response from the server.
 */
export async function getOneSection({
  token,
  idSection,
}: GetOneSectionProps): Promise<SectionOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${idSection}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await response.json()
}

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
  statusText = "", // Add this line
}: GetCourseProps): Promise<CourseListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/v2/?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  if (statusText) {
    url = `${url}&status=${statusText}`
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetCourseByTutorProps {
  token: string | undefined
  tutorUuid: string
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  statusText?: string | string[] | undefined
}

export async function getCourseByTutor({
  token,
  tutorUuid,
  page,
  limit,
  sortBy = "id_course",
  orderBy = "asc",
  searchQuery = "",
  statusText = "",
}: GetCourseByTutorProps): Promise<CourseListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/v2/by/${tutorUuid}?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  if (statusText) {
    url = `${url}&status=${statusText}`
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetUserEnrolledCourseList {
  token: string | undefined
  uuid: string | undefined
  limit: number
  page: number
  searchQuery?: string
}

/**
 * Retrieves the list of enrolled courses for a user.
 * @param {GetUserEnrolledCourseList} options - The options for fetching the enrolled course list.
 * @param {string} options.token - The user's authentication token.
 * @param {string} options.uuid - The user's UUID.
 * @param {number} options.limit - The maximum number of courses to retrieve per page.
 * @param {number} options.page - The page number of the courses to retrieve.
 * @param {string} [options.searchQuery=""] - The search query to filter the courses.
 * @returns {Promise<UserEnrolledCourseListRes>} - The promise that resolves to the enrolled course list response.
 */
export async function getUserEnrolledCourseList({
  token,
  uuid,
  limit,
  page,
  searchQuery = "",
}: GetUserEnrolledCourseList): Promise<UserEnrolledCourseListRes> {
  let baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getEnrolledCourse`

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

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface CheckUserEnrolledProps {
  token: string | undefined
  idCourse: string
  uuid: string
}

/**
 * Checks if a user is enrolled in a course.
 * @param {CheckUserEnrolledProps} options - The options for checking user enrollment.
 * @param {string} options.token - The user's authentication token.
 * @param {string} options.idCourse - The ID of the course to check enrollment for.
 * @param {string} options.uuid - The UUID of the user.
 * @returns {Promise<any>} - A promise that resolves to the JSON response from the server.
 */
export async function checkUserEnrolled({
  token,
  idCourse,
  uuid,
}: CheckUserEnrolledProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/checkIfUserEnrolled/${idCourse}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetOneCourseProps {
  token: string | undefined
  idCourse: string
}

/**
 * Retrieves information about a specific course.
 * @param {GetOneCourseProps} options - The options for retrieving the course.
 * @param {string} options.token - The authentication token.
 * @param {string} options.idCourse - The ID of the course to retrieve.
 * @returns {Promise<CourseOneRes>} - A promise that resolves to the course information.
 */
export async function getOneCourse({
  token,
  idCourse,
}: GetOneCourseProps): Promise<CourseOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
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

/**
 * Retrieves a list of users enrolled in a course.
 * @param token - The authentication token.
 * @param idCourse - The ID of the course.
 * @param limit - The maximum number of users to retrieve per page.
 * @param page - The page number of the users to retrieve.
 * @param sortBy - The field to sort the users by. Defaults to "created_at".
 * @param orderBy - The order in which to sort the users. Defaults to "desc".
 * @param searchQuery - The search query to filter the users by. Defaults to an empty string.
 * @returns A promise that resolves to the list of users.
 */
export async function getCourseUser({
  token,
  idCourse,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetCourseUser): Promise<UserListRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/users?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetVacantUserProps {
  token: string | undefined
  idCourse: string
}

/**
 * Retrieves the list of vacant users for a specific course.
 * @param {GetVacantUserProps} options - The options for retrieving vacant users.
 * @param {string} options.token - The authentication token.
 * @param {string} options.idCourse - The ID of the course.
 * @returns {Promise<CourseVacantUserListRes>} - The promise that resolves to the list of vacant users.
 */
export async function getVacantUser({
  token,
  idCourse,
}: GetVacantUserProps): Promise<CourseVacantUserListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/getVacantUser`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetQuizProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  quizTypes?: string | string[] | undefined
}

/**
 * Retrieves a list of operator quizzes based on the provided parameters.
 * @param token - The authentication token.
 * @param page - The page number of the quiz list.
 * @param limit - The maximum number of quizzes to retrieve per page.
 * @param sortBy - The field to sort the quizzes by (default: "id_quiz").
 * @param orderBy - The order in which to sort the quizzes (default: "asc").
 * @param searchQuery - The search query to filter the quizzes by (default: "").
 * @param quizTypes - The types of quizzes to filter by (optional).
 * @returns A promise that resolves to the list of operator quizzes.
 */
export async function getOperatorQuiz({
  token,
  page,
  limit,
  sortBy = "id_quiz",
  orderBy = "asc",
  searchQuery = "",
  quizTypes = "",
}: GetQuizProps): Promise<QuizListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  if (quizTypes) {
    url += `&quizTypes=${quizTypes}`
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetQuizByCreatorProps {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
  quizTypes?: string | string[] | undefined
  createdBy: string
}

export async function getQuizByCreator({
  token,
  page,
  limit,
  sortBy = "id_quiz",
  orderBy = "asc",
  searchQuery = "",
  quizTypes = "",
  createdBy,
}: GetQuizByCreatorProps): Promise<QuizListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/by/${createdBy}?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`

  if (quizTypes) {
    url += `&quizTypes=${quizTypes}`
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetQuizListWithNullSectionProps {
  token: string | undefined
  isNull: boolean
  createdBy?: string
}

/**
 * Retrieves a list of quizzes with a null section.
 * @param token - The authentication token.
 * @param isNull - Indicates whether the section is null or not.
 * @returns A promise that resolves to the response containing the quiz list.
 */
export async function getQuizListWithNullSection({
  token,
  isNull,
  createdBy,
}: GetQuizListWithNullSectionProps): Promise<QuizListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz?isNullSection=${isNull}`

  if (createdBy) {
    url += `&createdBy=${createdBy}`
  }

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

interface GetOneQuizProps {
  id: string
  token: string | undefined
}

/**
 * Retrieves a single quiz from the server.
 * @param {GetOneQuizProps} options - The options for fetching the quiz.
 * @returns {Promise<QuizOneRes>} - A promise that resolves to the fetched quiz.
 */
export async function getOneQuiz({
  id,
  token,
}: GetOneQuizProps): Promise<QuizOneRes> {
  const quizOne = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${id}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await quizOne.json()
}

interface GetMenuProps {
  token: string | undefined
  idRole: string
}

interface GetUserV2Props {
  token: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

/**
 * Retrieves a list of users based on the provided parameters.
 *
 * @param token - The authentication token.
 * @param page - The page number.
 * @param limit - The maximum number of users to retrieve per page.
 * @param sortBy - The field to sort the users by. Defaults to "created_at".
 * @param orderBy - The order in which to sort the users. Defaults to "desc".
 * @param searchQuery - The search query to filter the users.
 * @returns A promise that resolves to the list of users.
 */
export async function getUserV2({
  token,
  page,
  limit,
  sortBy = "created_at",
  orderBy = "desc",
  searchQuery = "",
}: GetUserV2Props): Promise<UserListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/v2?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
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

interface GetOneUserProps {
  token: string | undefined
  uuid: string
}

/**
 * Retrieves information about a single user.
 * @param {GetOneUserProps} options - The options for retrieving the user.
 * @param {string} options.token - The authentication token.
 * @param {string} options.uuid - The UUID of the user.
 * @returns {Promise<UserOneRes>} - A promise that resolves to the user information.
 */
export async function getOneUser({
  token,
  uuid,
}: GetOneUserProps): Promise<UserOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await res.json()
}

interface GetPemateriProps {
  token: string | undefined
  idGroup: number
}

/**
 * Retrieves a list of pemateri (user roles) from the server.
 *
 * @param {GetPemateriProps} options - The options for fetching the pemateri list.
 * @param {string} options.token - The authentication token.
 * @param {string} options.idGroup - The ID of the group.
 * @returns {Promise<UserRoleListRes>} - A promise that resolves to the pemateri list response.
 */
export async function getPemateriList({
  token,
  idGroup,
}: GetPemateriProps): Promise<UserRoleListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/group/${idGroup}/`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

interface GetRoleProps {
  token: string | undefined
}

export async function getRole({ token }: GetRoleProps): Promise<RoleListRes> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/role`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return await res.json()
}

/**
 * Retrieves the menu list for a given role ID.
 * @param {Object} props - The properties object.
 * @param {string} props.token - The authentication token.
 * @param {string} props.idRole - The role ID.
 * @returns {Promise<MenuListResNew>} - The menu list response.
 */
export async function getMenu({
  token,
  idRole,
}: GetMenuProps): Promise<MenuListResNew> {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/menu/role/${idRole}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return res.json()
}

interface GetRuleProps {
  token: string | undefined
  idRole: string
}

/**
 * Retrieves a rule based on the provided role ID.
 * @param {Object} props - The properties object.
 * @param {string} props.token - The authorization token.
 * @param {string} props.idRole - The ID of the role to retrieve the rule for.
 * @returns {Promise<RuleOneRes>} - A promise that resolves to the retrieved rule.
 */
export async function getRule({
  token,
  idRole,
}: GetRuleProps): Promise<RuleOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/rule/role/${idRole}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetReferenceProps {
  refCode: string
  token: string | undefined
}

/**
 * Retrieves a reference list from the server.
 * @param {Object} props - The properties object.
 * @param {string} props.token - The authentication token.
 * @param {string} props.refCode - The reference code.
 * @returns {Promise<ReferenceListRes>} - The reference list response.
 */
export async function getReference({
  token,
  refCode,
}: GetReferenceProps): Promise<ReferenceListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/references/${refCode}`,
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

interface GetOneContentProps {
  token: string | undefined
  idContent: string
}

/**
 * Retrieves a single content item from the server.
 * @param {GetOneContentProps} options - The options for retrieving the content.
 * @returns {Promise<ContentOneRes>} - A promise that resolves to the retrieved content.
 */
export async function getOneContent({
  token,
  idContent,
}: GetOneContentProps): Promise<ContentOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/${idContent}`

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

interface GetOneExerciseProps {
  token: string | undefined
  idExercise: string
}

/**
 * Retrieves a single exercise from the API.
 * @param {GetOneExerciseProps} params - The parameters for fetching the exercise.
 * @returns {Promise<QuizOneRes>} - A promise that resolves to the fetched exercise.
 */
export async function getOneExercise({
  token,
  idExercise,
}: GetOneExerciseProps): Promise<QuizOneRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetOneExerciseUserCountProps {
  token: string | undefined
  idExercise: string
}

/**
 * Retrieves the count of users who have attempted a specific exercise.
 * @param token - The authentication token.
 * @param idExercise - The ID of the exercise.
 * @returns A promise that resolves to the count of users who have attempted the exercise.
 */
export async function getOneExerciseUserCount({
  token,
  idExercise,
}: GetOneExerciseUserCountProps): Promise<QuizOneUserCountRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}/users/count`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetOneExerciseLinkedCourseProps {
  token: string | undefined
  idExercise: string
}

/**
 * Retrieves a single exercise linked to a course.
 * @param {GetOneExerciseLinkedCourseProps} options - The options for retrieving the exercise.
 * @returns {Promise<QuizLinkedList>} - A promise that resolves to the linked exercise.
 */
export async function getOneExerciseLinkedCourse({
  token,
  idExercise,
}: GetOneExerciseLinkedCourseProps): Promise<QuizLinkedList> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}/linked-course`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetOneExerciseLessonProps {
  token: string | undefined
  idExercise: string
}

/**
 * Retrieves a single quiz lesson.
 * @param {GetOneExerciseLessonProps} options - The options for retrieving the quiz lesson.
 * @returns {Promise<any>} - A promise that resolves to the JSON response of the quiz lesson.
 */
export async function getOneExerciseLesson({
  token,
  idExercise,
}: GetOneExerciseLessonProps): Promise<QuizQuestionListRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}/getLesson`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetExerciseListMemberProps {
  token: string | undefined
  idExercise: string
  limit: number
  page: number
  sortBy: string
  orderBy: string
}

/**
 * Retrieves a list of exercise members.
 * @param token - The authentication token.
 * @param idExercise - The ID of the exercise.
 * @param limit - The maximum number of members to retrieve per page.
 * @param page - The page number.
 * @param sortBy - The field to sort the members by (default: "attempts").
 * @param orderBy - The order in which to sort the members (default: "desc").
 * @returns A promise that resolves to the list of exercise members.
 */
export async function getListExerciseMember({
  token,
  idExercise,
  limit,
  page,
  sortBy = "attempts",
  orderBy = "desc",
}: GetExerciseListMemberProps): Promise<QuizMemberListRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}/getMember?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetExerciseResultProps {
  token: string | undefined
  idExercise: string
  limit: number
  page: number
  sortBy?: string
  orderBy?: string
}

/**
 * Retrieves a list of exercise results based on the provided parameters.
 * @param {GetExerciseResultProps} options - The options for fetching exercise results.
 * @param {string} options.token - The authentication token.
 * @param {string} options.idExercise - The ID of the exercise.
 * @param {number} options.limit - The maximum number of results to retrieve per page.
 * @param {number} options.page - The page number of the results to retrieve.
 * @param {string} [options.sortBy="created_at"] - The field to sort the results by. Defaults to "created_at".
 * @param {string} [options.orderBy="desc"] - The order in which to sort the results. Defaults to "desc".
 * @returns {Promise<any>} - A promise that resolves to the fetched exercise results.
 */
export async function getListExerciseResult({
  token,
  idExercise,
  limit,
  page,
  sortBy = "created_at",
  orderBy = "desc",
}: GetExerciseResultProps): Promise<QuizUserAttemptList> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idExercise}/getUserAttempt?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    },
    cache: "no-cache",
  })

  return await res.json()
}

interface GetThreadsListProps {
  idCourse: string
  token: string | undefined
  limit: number
  page: number
}

/**
 * Retrieves a list of threads for a given course.
 * @param idCourse - The ID of the course.
 * @param token - The authentication token.
 * @param limit - The maximum number of threads to retrieve.
 * @param page - The page number of the thread list.
 * @returns A promise that resolves to the thread list response.
 */
export async function getThreadList({
  idCourse,
  token,
  limit,
  page,
}: GetThreadsListProps): Promise<ThreadListRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/threads?page=${page}&limit=${limit}`

  const res = await fetch(url, {
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

/**
 * Retrieves a single thread from the server.
 * @param token - The authentication token.
 * @param idThreads - The ID of the thread to retrieve.
 * @returns A promise that resolves to the response containing the thread.
 */
export async function getOneThread({
  token,
  idThreads,
}: GetOneThreadProps): Promise<ThreadOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/${idThreads}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetPostsListProps {
  token: string | undefined
  idThreads: string
  limit: number
  page: number
}

/**
 * Retrieves a list of posts based on the provided parameters.
 * @param {GetPostsListProps} options - The options for fetching the posts list.
 * @returns {Promise<PostsListRes>} - A promise that resolves to the posts list response.
 */
export async function getPostsList({
  token,
  idThreads,
  limit,
  page,
}: GetPostsListProps): Promise<PostsListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/threads/${idThreads}/posts/?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}
