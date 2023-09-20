import { redirect } from "next/navigation"

import { UserQuizTakenListRes } from "@/types/me/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, UserRecentQuizTableShell } from "@/components/shell"

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

interface MeQuizPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function ({ searchParams }: MeQuizPageProps) {
  const user = await getCurrentUser()

  const tokenExtract = extractToken(user?.token)

  const { page, per_page, sort, course_name, category } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortInitial = typeof sort === "string" ? sort : "desc"
  const orderByInitial = typeof sort === "string" ? sort : "created_at"

  // split sort
  const sortBy = sortInitial.split(".")[1]
  const orderBy = orderByInitial.split(".")[0]

  const userQuizAttemptRes = await getUserQuizAttemptList({
    token: user?.token,
    uuid: tokenExtract?.id,
    page: pageInitial,
    limit: limitInitial,
    sortBy,
    orderBy,
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
            href: "/dashboard/me",
            title: `${tokenExtract.username} - (${tokenExtract.email})`,
          },
          {
            href: "/dashboard/me/recent-course",
            title: "Semua Percobaan Quiz Saya",
          },
        ]}
      />
      <DashboardHeader
        heading="Semua Percobaan Kuis Saya"
        description="Semua percobaan kuis yang saya jawab"
      />
      <UserRecentQuizTableShell
        data={userQuizAttemptRes.data}
        pageCount={userQuizAttemptRes.totalPage}
      />
    </DashboardShell>
  )
}
