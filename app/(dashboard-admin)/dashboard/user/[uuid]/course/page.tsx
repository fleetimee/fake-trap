import { redirect } from "next/navigation"

import { UserEnrolledCourseListRes } from "@/types/me/res"
import { UserOneRes } from "@/types/user/res"
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
  title: "Semua Pelatihan",
  description: "Pelatihan yang saya ikuti",
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

interface UserCoursePageProps {
  params: {
    uuid: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function UserCoursePage({
  searchParams,
  params,
}: UserCoursePageProps) {
  const user = await getCurrentUser()

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
    uuid: params.uuid,
    page: pageInitial,
    limit: limitInitial,
    orderBy,
    sortBy,
    searchQuery: searchQueryInitial,
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
            href: `/dashboard/user/${userData.data?.uuid}/course`,
            title: `Semua Pelatihan ${userData.data?.username}`,
          },
        ]}
      />
      <DashboardHeader
        heading={`Semua Pelatihan ${userData.data?.username}`}
        description={`Semua pelatihan yang ${userData.data?.username} ikuti`}
      />
      <UserEnrolledCourseTableShell
        data={userCourseResp.data}
        pageCount={userCourseResp.totalPage}
      />
    </DashboardShell>
  )
}
