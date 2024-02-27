import { getOperatorCategory } from "@/lib/fetcher/category-fetcher"
import { CardDashboardIndicator } from "@/components/app/dashboard/ui/"

interface DashboardCategoryCardCountProps {
  token: string | undefined
}

export async function DashboardCategoryCardCount({
  token,
}: DashboardCategoryCardCountProps) {
  const categoryResp = await getOperatorCategory({
    token: token,
    limit: 1,
    page: 1,
  })

  return (
    <CardDashboardIndicator
      title="Modul"
      icon="category"
      content={categoryResp.count}
      description="Modul yang tersedia"
    />
  )
}
