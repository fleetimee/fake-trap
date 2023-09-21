import { redirect } from "next/navigation"

import { UserQuizGroupedRes } from "@/types/me/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, UserQuizGroupedTableShell } from "@/components/shell"

export const metadata = {
  title: "Semua Quiz Saya",
  description: "Quiz yang saya ikuti",
}

interface GetQuizGroupedByCourse {
  token: string | undefined
  uuid: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
}

async function getQuizGroupedByCourse({
  token,
  uuid,
  page,
  limit,
  sortBy = "asc",
  orderBy = "created_at",
}: GetQuizGroupedByCourse): Promise<UserQuizGroupedRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getDistinctQuizGroupedAndAveraged?limit=${limit}&page=${page}&sortBy=${sortBy}&orderBy=${orderBy}`,
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

interface MeQuizPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
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
  const sortByInitial = typeof sort === "string" ? sort : "asc"
  const orderByInitial = typeof category === "string" ? category : "created_at"

  // split sort
  const sortBy = sortByInitial.split(".")[1]
  const orderBy = orderByInitial.split(".")[0]

  const userQuizGrouped = await getQuizGroupedByCourse({
    token: user?.token,
    uuid: tokenExtract?.id,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortBy,
    orderBy: orderBy,
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
            href: "/dashboard/me/averaged-quiz",
            title: "Semua Quiz Saya",
          },
        ]}
      />
      <DashboardHeader
        heading="Semua Kuis Saya"
        description="Semua kuis yang saya ikuti"
      />
      <UserQuizGroupedTableShell
        data={userQuizGrouped.data}
        pageCount={userQuizGrouped.totalPage}
      />
    </DashboardShell>
  )
}
