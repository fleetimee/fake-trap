import { redirect } from "next/navigation"

import { ApprovalListRes } from "@/types/approval/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Icons } from "@/components/icons"
import {
  DashboardShell,
  RejectedCourseApprovalTableShell,
} from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"





interface GetRejectedApprovalProps {
  token: string | undefined
  limit: number
  page: number
  orderBy?: string
  searchQuery?: string
}

async function getRejectedApproval({
  token,
  limit,
  page,
  orderBy = "asc",
  searchQuery = "",
}: GetRejectedApprovalProps): Promise<ApprovalListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/rejected?limit=${limit}&page=${page}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
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

interface SupervisorApproveCourseRejectedPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function SupervisorApproveCourseRejectedPage({
  searchParams,
}: SupervisorApproveCourseRejectedPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, sort, course_name } = searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const orderByInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial = typeof course_name === "string" ? course_name : ""

  // split orderBy
  const orderBy = orderByInitial.split(".")[1]

  const rejectedResp = await getRejectedApproval({
    token: user?.token,
    limit: limitInitial,
    page: pageInitial,
    orderBy,
    searchQuery: searchQueryInitial,
  })

  return (
    <DashboardShell>
      <Alert>
        <Icons.close className="h-4 w-4 text-yellow-400" />
        <AlertTitle>Rejected Pelatihan</AlertTitle>
        <AlertDescription>
          Berikut adalah pelatihan yang ditolak oleh supervisor
        </AlertDescription>
      </Alert>

      <RejectedCourseApprovalTableShell
        data={rejectedResp.data}
        pageCount={rejectedResp.totalPage}
      />
    </DashboardShell>
  )
}
