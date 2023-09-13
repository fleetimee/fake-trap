import { redirect } from "next/navigation"

import { UserListRes } from "@/types/user/res/user-list"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { CreateUserSheet } from "@/components/app/user/operations"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, UserTableShell } from "@/components/shell"

export const metadata = {
  title: "User",
  description: "User yang tersedia di e-learning",
}

interface GetUserListProps {
  token: string | undefined
  page: number
  limit: number
  username?: string
  sortField?: string
  sortOrder?: string
}

async function getUserList({
  token,
  page,
  limit,
  username = "",
  sortField = "created_at",
  sortOrder = "desc",
}: GetUserListProps): Promise<UserListRes> {
  const userList = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}&filterField=username&filterValue=${username}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return userList.json()
}

interface UserPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function UserPage({ searchParams }: UserPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, username, category } = searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "created_at"
  const sortOrderInitial = typeof sort === "string" ? sort : "desc"
  const nameInitial = typeof username === "string" ? username : ""

  // Split sort into sortField and sortOrder
  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const userList = await getUserList({
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
    sortField: sortField,
    sortOrder: sortOrder,
    username: nameInitial,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/dashboard",
            title: "Dashboard",
          },
          {
            href: "/dashboard/user",
            title: "User",
          },
        ]}
      />
      <div className="mb-4 flex w-full items-center justify-between">
        <DashboardHeader
          heading="User"
          description="User yang tersedia di e-learning"
        />

        <CreateUserSheet />
      </div>

      <UserTableShell data={userList.data} pageCount={userList.totalPage} />
    </DashboardShell>
  )
}
