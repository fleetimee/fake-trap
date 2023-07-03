import { CategoryResponse } from "@/types/category-res"

import { CardDashboardIndicator } from "../card-dashboard-indicator"

async function getCategory(
  token: string | undefined
): Promise<CategoryResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category?limit=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function DashboardCategoryCardCount(props: {
  token: string | undefined
}) {
  const categoryResp = await getCategory(props.token)

  return (
    <CardDashboardIndicator
      title="Kategori"
      icon="category"
      content={categoryResp.count}
      description="Kategori yang tersedia"
    />
  )
}
