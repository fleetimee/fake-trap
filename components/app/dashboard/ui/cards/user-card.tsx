import { getUserV2 } from "@/lib/fetcher/users-fetcher"
import { CardDashboardIndicator } from "@/components/app/dashboard/ui/"

interface DashboardUserCardCountProps {
  token: string | undefined
}

export async function DashboardUserCardCount({
  token,
}: DashboardUserCardCountProps) {
  const { count } = await getUserV2({
    token: token,
    limit: 1,
    page: 1,
  })

  return (
    <CardDashboardIndicator
      title="User"
      icon="user"
      content={count}
      description="User yang terdaftar"
    />
  )
}
