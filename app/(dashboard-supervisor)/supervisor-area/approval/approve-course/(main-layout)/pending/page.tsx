import { redirect } from "next/navigation"

import { ApprovalListRes } from "@/types/approval/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { PendingCourseApprovalTableShell } from "@/components/shell"





interface GetPendingApprovalProps {
  token: string | undefined
  limit: number
  page: number
  orderBy?: string
  searchQuery?: string
}

async function getPendingApproval({
  token,
  limit,
  page,
  orderBy = "asc",
  searchQuery = "",
}: GetPendingApprovalProps): Promise<ApprovalListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/pending?limit=${limit}&page=${page}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
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

interface SupervisorApproveCoursePendingPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function SupervisorApproveCoursePendingPage({
  searchParams,
}: SupervisorApproveCoursePendingPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, sort, course_name, category } = searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const orderByInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial = typeof course_name === "string" ? course_name : ""

  // split orderBy
  const orderBy = orderByInitial.split(".")[1]

  const pendingResp = await getPendingApproval({
    token: user?.token,
    limit: limitInitial,
    page: pageInitial,
    orderBy: orderBy,
    searchQuery: searchQueryInitial,
  })

  return (
    <PendingCourseApprovalTableShell
      data={pendingResp.data}
      pageCount={pendingResp.totalPage}
    />
  )
}
