import { Suspense } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getSupervisorLmsApprovalRequests } from "@/lib/fetcher/approval-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { ApprovalCourseSupervisorTableShell } from "@/components/shell/approval-spv-course-table-shell"

export const metadata: Metadata = {
  title: "Approve Materi",
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

  const { page, per_page, sort, status_text, course_name, from, to } =
    searchParams ?? {}

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "created_at"
  const sortOrderInitial = typeof sort === "string" ? sort : "asc"
  const searchQueryInitial = typeof course_name === "string" ? course_name : ""

  // Split sort into sortField and sortOrder
  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  const fromInitial = typeof from === "string" ? from : ""
  const toInitial = typeof to === "string" ? to : ""

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
    from: fromInitial,
    to: toInitial,
    statusCode: status_text,
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
            title: "Approve Pembelajaran",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Approve Pembelajaran"
            description="Approve Pembelajaran yang diajukan oleh Operator LMS"
          />
        </MotionDiv>

        <DateRangePicker
          align="end"
          className="flex min-w-[200px] place-items-end items-end justify-self-end"
        />
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
