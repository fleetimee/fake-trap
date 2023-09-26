import { redirect } from "next/navigation"

import { ApprovalKnowledgeListRes } from "@/types/approval/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import {
  ApprovedKnowledgeApprovalTableShell,
  DashboardShell,
} from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface GetApprovedKnowledgeProps {
  token: string | undefined
  limit: number
  page: number
  orderBy?: string
  searchQuery?: string
}

async function GetApprovedKnowledge({
  token,
  limit,
  page,
  orderBy = "asc",
  searchQuery = "",
}: GetApprovedKnowledgeProps): Promise<ApprovalKnowledgeListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/approved?limit=${limit}&page=${page}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface SupervisorApproveKnowledgeApprovedPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function SupervisorApproveKnowledgeApprovedPage({
  searchParams,
}: SupervisorApproveKnowledgeApprovedPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, sort, knowledge_title, category } = searchParams ?? {}

  // Initial value
  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const orderByInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial =
    typeof knowledge_title === "string" ? knowledge_title : ""

  // split orderBy
  const orderBy = orderByInitial.split(".")[1]

  const approvedResp = await GetApprovedKnowledge({
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
          <Icons.check className="h-4 w-4 text-yellow-400" />
          <AlertTitle>Approved Pengetahuan</AlertTitle>
          <AlertDescription>
            Berikut adalah daftar pengetahuan yang telah disetujui oleh
            supervisor
          </AlertDescription>
        </Alert>
      </MotionDiv>

      <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <ApprovedKnowledgeApprovalTableShell
          data={approvedResp?.data}
          pageCount={approvedResp.totalPage}
        />
      </MotionDiv>
    </DashboardShell>
  )
}
