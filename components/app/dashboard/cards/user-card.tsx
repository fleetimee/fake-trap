import { UserResponse } from "@/types/user-res"
import { getCurrentUser } from "@/lib/session"
import { CardDashboardIndicator } from "@/components/app/dashboard/card-dashboard-indicator"

async function getUser(token: string | undefined): Promise<UserResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users`,
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

export async function DashboardUserCardCount(props: {
  token: string | undefined
}) {
  const userResp = await getUser(props.token)

  return (
    <CardDashboardIndicator
      title="User"
      icon="user"
      content={userResp.count}
      description="User yang terdaftar"
    />
  )
}
