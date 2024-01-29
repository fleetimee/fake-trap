import { CategoryNavListRes } from "@/types/navbar/res/navbar-list"

export async function getNavbar(): Promise<CategoryNavListRes> {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/public/category/navbar`

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  return await res.json()
}
