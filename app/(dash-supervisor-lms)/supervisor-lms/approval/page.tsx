import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getSupervisorLmsApprovalRequests } from "@/lib/fetcher/approval-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { ApprovalCourseSupervisorTableShell } from "@/components/shell/approval-spv-course-table-shell"

export const metadata: Metadata = {
  title: "Approve Pengetahuan",
}

interface SupervisorLmsApprovalPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function SupervisorLmsApprovalPage({
  searchParams,
}: SupervisorLmsApprovalPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, status, knowledge_title } = searchParams ?? {}

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

  const tokenExtracted = extractToken(user?.token)

  const approvals = await getSupervisorLmsApprovalRequests({
    idApprover: tokenExtracted?.id,
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortField,
    orderBy: sortOrder,
    searchQuery: searchQueryInitial,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/supervisor-lms",
            title: "Dashboard",
          },
          {
            href: "/supervisor-lms/approval",
            title: "Approve Pelatihan",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Approve Pelatihan"
            description="Approve Pelatihan yang diajukan oleh Operator LMS"
          />
        </MotionDiv>
      </div>

      <Suspense fallback={<DataTableSkeleton columnCount={10} />}>
        <ApprovalCourseSupervisorTableShell
          data={approvals.data}
          pageCount={approvals.totalPage}
        />
      </Suspense>
    </DashboardShell>
  )
}
