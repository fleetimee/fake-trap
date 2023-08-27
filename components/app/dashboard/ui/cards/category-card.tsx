import { CategoryListRes } from "@/types/category/res"
import { CardDashboardIndicator } from "@/components/app/dashboard/ui/"

interface GetCategoryCountProps {
  token: string | undefined
}

async function getCategoryCount({
  token,
}: GetCategoryCountProps): Promise<CategoryListRes> {
  const categoryCountRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category?limit=1`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await categoryCountRes.json()
}

interface DashboardCategoryCardCountProps {
  token: string | undefined
}

export async function DashboardCategoryCardCount({
  token,
}: DashboardCategoryCardCountProps) {
  const categoryResp = await getCategoryCount({
    token: token,
  })

  return (
    <CardDashboardIndicator
      title="Kategori"
      icon="category"
      content={categoryResp.count}
      description="Kategori yang tersedia"
    />
  )
}
