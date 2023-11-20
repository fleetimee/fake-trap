import { CategoryListRes, CategoryOneRes } from "@/types/category/res"
import { KnowledgeListRes, KnowledgeOneRes } from "@/types/knowledge/res"
import { MenuListResNew } from "@/types/menu/res"
import { QuizListRes, QuizOneRes } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { RuleOneRes } from "@/types/rule/res"
import { UserOneRes } from "@/types/user/res"

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

interface GetCategoryProps {
  token: string | undefined
  page: number
  limit: number
}

/**
 * Retrieves a list of categories.
 * @param {GetCategoryProps} options - The options for fetching the category list.
 * @returns {Promise<CategoryListRes>} - A promise that resolves to the category list response.
 */
export async function getListCategory({
  token,
  page,
  limit,
}: GetCategoryProps): Promise<CategoryListRes> {
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
