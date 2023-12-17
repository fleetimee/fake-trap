import { UserListRes } from "@/types/user/res"
import { CardDashboardIndicator } from "@/components/app/dashboard/ui/"





interface GetUserCountProps {
  token: string | undefined
}

async function getUserCount({
  token,
}: GetUserCountProps): Promise<UserListRes> {
  const userCountRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await userCountRes.json()
}

interface DashboardUserCardCountProps {
  token: string | undefined
}

export async function DashboardUserCardCount({
  token,
}: DashboardUserCardCountProps) {
  const res = await getUserCount({
    token: token,
  })

  return (
    <CardDashboardIndicator
      title="User"
      icon="user"
      content={res.count}
      description="User yang terdaftar"
    />
  )
}
