import { redirect } from "next/navigation"

import { UserQuizGroupedRes } from "@/types/me/res"
import { UserOneRes } from "@/types/user/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, UserQuizGroupedTableShell } from "@/components/shell"

export const metadata = {
  title: "Rata Rata Nilai Quiz",
  description: "Rata rata nilai quiz yang saya ikuti",
}

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

interface UserDetailPageProps {
  params: {
    uuid: string
  }
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

interface UserAveragedQuizPageProps {
  params: {
    uuid: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function MeQuizPage({
  searchParams,
  params,
}: UserAveragedQuizPageProps) {
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
    uuid: params.uuid,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortBy,
    orderBy: orderBy,
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
            href: `/dashboard/user/${userData.data?.uuid}/averaged-quiz`,
            title: `Rata Rata Nilai Quiz`,
          },
        ]}
      />
      <DashboardHeader
        heading={`Rata Rata Nilai Quiz ${userData.data?.username}`}
        description={`Rata rata nilai quiz yang diikuti oleh ${userData.data?.username}`}
      />
      <UserQuizGroupedTableShell
        data={userQuizGrouped.data}
        pageCount={userQuizGrouped.totalPage}
      />
    </DashboardShell>
  )
}
