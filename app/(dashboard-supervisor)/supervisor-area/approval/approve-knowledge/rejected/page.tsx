import { redirect } from "next/navigation"

import { ApprovalKnowledgeListRes, ApprovalListRes } from "@/types/approval/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import {
  DashboardShell,
  RejectedKnowledgeApprovalTableShell,
} from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface GetRejectedKnowledgeProps {
  token: string | undefined
  limit: number
  page: number
  orderBy?: string
  searchQuery?: string
}

async function getRejectedKnowledgeApproval({
  token,
  limit,
  page,
  orderBy = "asc",
  searchQuery = "",
}: GetRejectedKnowledgeProps): Promise<ApprovalKnowledgeListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/rejected?limit=${limit}&page=${page}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  )

  return await res.json()
}

interface SupervisorRejectedKnowledgeApprovalProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function SupervisorRejectedKnowledgeApproval({
  searchParams,
}: SupervisorRejectedKnowledgeApprovalProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, sort, knowledge_title } = searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const orderByInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial =
    typeof knowledge_title === "string" ? knowledge_title : ""

  // split orderBy
  const orderBy = orderByInitial.split(".")[1]

  const rejectedResp = await getRejectedKnowledgeApproval({
    limit: limitInitial,
    page: pageInitial,
    orderBy: orderBy,
    searchQuery: searchQueryInitial,
    token: user?.token,
  })

  return (
    <DashboardShell>
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Alert>
          <Icons.close className="h-4 w-4 text-yellow-400" />
          <AlertTitle>Rejected Pengetahuan</AlertTitle>
          <AlertDescription>
            Berikut adalah daftar pengetahuan yang ditolak oleh supervisor
            Pembuat pengetahuan dapat mengedit pengetahuan yang ditolak kemudian
            mengirim ulang untuk diverifikasi oleh supervisor
          </AlertDescription>
        </Alert>
      </MotionDiv>

      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <RejectedKnowledgeApprovalTableShell
          data={rejectedResp.data}
          pageCount={rejectedResp.totalPage}
        />
      </MotionDiv>
    </DashboardShell>
  )
}
