import { redirect } from "next/navigation"

import { ApprovalKnowledgeListRes } from "@/types/approval/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import {
  DashboardShell,
  PendingKnowledgeApprovalTableShell,
} from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface GetPendingKnowledgeApprovalProps {
  token: string | undefined
  limit: number
  page: number
  orderBy?: string
  searchQuery?: string
}

async function getPendingKnowledgeApproval({
  token,
  limit,
  page,
  orderBy = "asc",
  searchQuery = "",
}: GetPendingKnowledgeApprovalProps): Promise<ApprovalKnowledgeListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/pending?limit=${limit}&page=${page}&orderBy=${orderBy}&searchQuery=${searchQuery}`,
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

interface SupervisorApproveKnowledgePendingPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function SupervisorApproveKnowledgePendingPage({
  searchParams,
}: SupervisorApproveKnowledgePendingPageProps) {
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

  const pendingResp = await getPendingKnowledgeApproval({
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
          <Icons.pending className="h-4 w-4 text-yellow-400" />
          <AlertTitle>Pending Pengetahuan</AlertTitle>
          <AlertDescription>
            Berikut adalah daftar pengetahuan yang belum di approve, tugas anda
            adalah menyetujui atau menolak pengetahuan tersebut.
          </AlertDescription>
        </Alert>
      </MotionDiv>

      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <PendingKnowledgeApprovalTableShell
          data={pendingResp.data}
          pageCount={pendingResp.totalPage}
        />
      </MotionDiv>
    </DashboardShell>
  )
}
