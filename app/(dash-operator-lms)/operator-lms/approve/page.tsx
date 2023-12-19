import { Metadata } from "next"

import {
  getApprovalRequestList,
  getCourseApprovalRequestList,
} from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Approves } from "@/components/approves"
import { CourseApproves } from "@/components/course-approve"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Approve Request",
}

interface OperatorLMSApprovePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function OperatorLMSApprovePage({
  searchParams,
}: OperatorLMSApprovePageProps) {
  const user = await getCurrentUser()

  const { page, per_page, statuses } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 6

  const tokenExtracted = extractToken(user?.token)

  const requests = await getCourseApprovalRequestList({
    token: user?.token,
    page: pageInitial,
    limit: limitInitial,
    idRequester: tokenExtracted?.id,
    status: statuses,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/approve",
            title: "Approve Request",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Pengajuan"
            description="Daftar pengajuan yang perlu di approve"
          />
        </MotionDiv>
      </div>

      <Separator />

      <CourseApproves
        approvals={requests.data}
        pageCount={requests.totalPage}
      />
    </DashboardShell>
  )
}
