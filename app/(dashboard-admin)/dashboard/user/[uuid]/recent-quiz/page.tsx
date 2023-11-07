import { redirect } from "next/navigation"

import { UserQuizTakenListRes } from "@/types/me/res"
import { UserOneRes } from "@/types/user/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, UserRecentQuizTableShell } from "@/components/shell"

interface GetOneUserProps {
  token: string | undefined
  uuid: string
}

async function getOneUserProps({
  token,
  uuid,
}: GetOneUserProps): Promise<UserOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await res.json()
}

export const metadata = {
  title: "Semua Percobaan Quiz Saya",
  description: "Percobaan Quiz yang saya ikuti",
}

interface GetUserQuizAttemptList {
  token: string | undefined
  uuid: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
}

async function getUserQuizAttemptList({
  token,
  uuid,
  page,
  limit,
  sortBy = "asc",
  orderBy = "created_at",
}: GetUserQuizAttemptList): Promise<UserQuizTakenListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getQuizThatUserTaken?page=${page}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface UserQuizPageProps {
  params: {
    uuid: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function UserQuizPage({
  searchParams,
  params,
}: UserQuizPageProps) {
  const user = await getCurrentUser()

  const tokenExtract = extractToken(user?.token)

  const { page, per_page, sort, course_name, category } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortInitial = typeof sort === "string" ? sort : "desc"
  const orderByInitial = typeof sort === "string" ? sort : "created_at"

  const sortBy = sortInitial.split(".")[1]
  const orderBy = orderByInitial.split(".")[0]

  const userQuizAttemptRes = await getUserQuizAttemptList({
    token: user?.token,
    uuid: params.uuid,
    page: pageInitial,
    limit: limitInitial,
    sortBy,
    orderBy,
  })

  const userData = await getOneUserProps({
    token: user?.token,
    uuid: params.uuid,
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
            title: `User`,
          },
          {
            href: `/dashboard/user/${userData.data?.uuid}`,
            title: `${userData.data?.username} - (${userData.data?.email})`,
          },
          {
            href: `/dashboard/user/${userData.data?.uuid}/recent-quiz`,
            title: `Riwayat Quiz ${userData.data?.username}`,
          },
        ]}
      />
      <DashboardHeader
        heading={`Riwayat Quiz ${userData.data?.username}`}
        description={`Semua percobaan quiz yang diikuti oleh ${userData.data?.username}`}
      />
      <UserRecentQuizTableShell
        data={userQuizAttemptRes.data}
        pageCount={userQuizAttemptRes.totalPage}
      />
    </DashboardShell>
  )
}
