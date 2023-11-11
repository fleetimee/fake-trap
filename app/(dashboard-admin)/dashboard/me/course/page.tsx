import { redirect } from "next/navigation"

import { UserEnrolledCourseListRes } from "@/types/me/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import {
  DashboardShell,
  UserEnrolledCourseTableShell,
} from "@/components/shell"

export const metadata = {
  title: "Pelatihan Saya",
  description: "Pelatihan yang saya ikuti",
}

interface GetUserEnrolledCourseList {
  token: string | undefined
  uuid: string | undefined
  page: number
  limit: number
  sortBy?: string
  orderBy?: string
  searchQuery?: string
}

async function getUserEnrolledCourseList({
  token,
  uuid,
  page,
  limit,
  sortBy = "id_course",
  orderBy = "asc",
  searchQuery = "",
}: GetUserEnrolledCourseList): Promise<UserEnrolledCourseListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/${uuid}/getEnrolledCourse?page=${page}&limit=${limit}&sortBy=${orderBy}&orderBy=${sortBy}&searchQuery=${searchQuery}`,
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

interface MeCoursePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function MeCoursePage({
  searchParams,
}: MeCoursePageProps) {
  const user = await getCurrentUser()

  const tokenExtract = extractToken(user?.token)

  const { page, per_page, sort, course_name, category } = searchParams ?? {}

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortInitial = typeof sort === "string" ? sort : "created_at"
  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const searchQueryInitial = typeof course_name === "string" ? course_name : ""

  // split sort`
  const sortBy = sortInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const userCourseResp = await getUserEnrolledCourseList({
    token: user?.token,
    uuid: tokenExtract?.id,
    page: pageInitial,
    limit: limitInitial,
    orderBy,
    sortBy,
    searchQuery: searchQueryInitial,
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
            href: "/dashboard/me/course",
            title: "Semua Pelatihan Saya",
          },
        ]}
      />
      <DashboardHeader
        heading="Pelatihan Saya"
        description="Pelatihan yang saya ikuti"
      />
      <UserEnrolledCourseTableShell
        data={userCourseResp.data}
        pageCount={userCourseResp.totalPage}
      />
    </DashboardShell>
  )
}
