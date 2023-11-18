import { CategoryListRes } from "@/types/category/res"
import { MenuListResNew } from "@/types/menu/res"
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
