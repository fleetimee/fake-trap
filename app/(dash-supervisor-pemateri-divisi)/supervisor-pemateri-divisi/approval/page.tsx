import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getSupervisorPemateriApprovalRequests } from "@/lib/fetcher/approval-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { ApprovalKnowledgeSupervisorPemateriTableShell } from "@/components/shell/approval-spv-pemateri-table-shell"

export const metadata: Metadata = {
  title: "Approve Pengetahuan",
}

interface SpvPemateriDivisiApproveCoursePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function SpvPemateriDivisiApproveKnowledgePage({
  searchParams,
}: SpvPemateriDivisiApproveCoursePageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, status, knowledge_title } = searchParams ?? {}

  const tokenExtracted = extractToken(user?.token)

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "created_at"
  const sortOrderInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial =
    typeof knowledge_title === "string" ? knowledge_title : ""

  // Split sort into sortField and sortOrder
  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const approvals = await getSupervisorPemateriApprovalRequests({
    idApprover: tokenExtracted?.id,
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
    searchQuery: searchQueryInitial,
    sortBy: sortField,
    orderBy: sortOrder,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/supervisor-pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/supervisor-pemateri-divisi/approval",
            title: "Approve Pengetahuan",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Approve Pengetahuan"
            description="Approve Materi yang diajukan oleh pemateri divisi"
          />
        </MotionDiv>
      </div>

      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <ApprovalKnowledgeSupervisorPemateriTableShell
          data={approvals.data}
          pageCount={approvals.totalPage}
        />
      </Suspense>
    </DashboardShell>
  )
}
