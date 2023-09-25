import { Metadata } from "next"
import { redirect } from "next/navigation"

import { ApprovalListRes } from "@/types/approval/res/approval-list"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { PendingCourseApprovalTableShell } from "@/components/shell/pending-course-approval-table-shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface GetPendingApproval {
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
}: GetPendingApproval): Promise<ApprovalListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/pending?limit=${limit}&page=${page}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    <DashboardShell>
      <Alert>
        <Icons.pending className="h-4 w-4 text-yellow-400" />
        <AlertTitle>Pending Pelatihan</AlertTitle>
        <AlertDescription>
          Berikut adalah daftar pelatihan yang masih menunggu persetujuan
        </AlertDescription>
      </Alert>

      <PendingCourseApprovalTableShell
        data={pendingResp.data}
        pageCount={pendingResp.totalPage}
      />
    </DashboardShell>
  )
}
