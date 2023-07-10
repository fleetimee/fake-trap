import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getAllUsersData } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { UserDataTable } from "@/components/app/course/detail/user-data-table"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

import { columns } from "./user-columns"
import { UserDataTableUser } from "./user-data-table"

export const metadata = {
  title: "User",
  description: "User yang tersedia di e-learning",
}

export default async function UserPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const userList = await getAllUsersData({
    token: user?.token,
  })

  return (
    <DashboardShell>
      <DashboardHeader
        heading="User"
        description="User yang tersedia di e-learning"
      />
      <UserDataTableUser columns={columns} data={userList.data} />
    </DashboardShell>
  )
}
