import { CategoryListRes } from "@/types/category/res"
import { UserOneRes } from "@/types/user/res"

interface GetUserProps {
  token: string | undefined
  uuid: string
}

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

async function getCategory({
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
