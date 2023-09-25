import { Metadata } from "next"
import { redirect } from "next/navigation"

import { ApprovalListRes } from "@/types/approval/res/approval-list"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { ApprovedCourseApprovalTableShell } from "@/components/shell/approved-course-approval-table-shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface GetApprovedApproval {
  token: string | undefined
  limit: number
  page: number
  orderBy?: string
  searchQuery?: string
}

async function getApprovedApproval({
  token,
  limit,
  page,
  orderBy = "asc",
  searchQuery = "",
}: GetApprovedApproval): Promise<ApprovalListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/approved?limit=${limit}&page=${page}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
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

interface SupervisorApproveCourseApprovedPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function SupervisorApprovedCourseApprovedPage({
  searchParams,
}: SupervisorApproveCourseApprovedPageProps) {
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

  const approvedResp = await getApprovedApproval({
    token: user?.token,
    limit: limitInitial,
    page: pageInitial,
    orderBy: orderBy,
    searchQuery: searchQueryInitial,
  })

  return (
    <DashboardShell>
      <Alert>
        <Icons.check className="h-4 w-4 text-yellow-400" />
        <AlertTitle>Approved Pelatihan</AlertTitle>
        <AlertDescription>
          Berikut adalah daftar pelatihan yang telah disetujui oleh supervisor
        </AlertDescription>
      </Alert>

      <ApprovedCourseApprovalTableShell
        data={approvedResp.data}
        pageCount={approvedResp.totalPage}
      />
    </DashboardShell>
  )
}
