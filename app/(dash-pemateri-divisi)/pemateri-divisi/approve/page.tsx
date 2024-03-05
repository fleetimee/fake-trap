import { Metadata } from "next"
import NotFoundLottie from "@/public/lottie/not-found.json"

import {
  getApprovalKnowledgeCount,
  getPemateriApprovalRequests,
} from "@/lib/fetcher/approval-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Approves } from "@/components/approves"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { NotFoundAnim } from "@/components/not-found-anim"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Widget } from "@/components/widget"

export const metadata: Metadata = {
  title: "Approve Request",
}

interface PemateriDivisiApprovePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function PemateriDivisiApprovePage({
  searchParams,
}: PemateriDivisiApprovePageProps) {
  const user = await getCurrentUser()

  const { page, per_page, statuses, approverId, sort, from, to } = searchParams

  const approverIdInitial = typeof approverId === "string" ? approverId : ""

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 6

  const sortByInitial = typeof sort === "string" ? sort : "created_at"
  const orderByInitial = typeof sort === "string" ? sort : "desc"

  const fromInitial = typeof from === "string" ? from : ""
  const toInitial = typeof to === "string" ? to : ""

  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  const tokenExtracted = extractToken(user?.token)

  const requests = await getPemateriApprovalRequests({
    limit: limitInitial,
    page: pageInitial,
    token: user?.token,
    idRequester: tokenExtracted?.id,
    status: statuses,
    sortBy: sortBy,
    orderBy: orderBy,
    approverId: approverIdInitial,
    from: fromInitial,
    to: toInitial,
  })

  const count = await getApprovalKnowledgeCount({
    token: user?.token,
    userUuid: tokenExtracted?.id,
    isSupervisor: false,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/pemateri-divisi/approve",
            title: "Approve Request",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-2"
        >
          <DashboardHeader
            heading="Pengajuan Materi"
            description="Ini merupakan daftar materi yang sudah kamu ajukan ke atasanmu"
          />
        </MotionDiv>
      </div>

      {requests.data.length === 0 ? (
        <NotFoundAnim
          animationData={NotFoundLottie}
          title="Belum ada pengajuan"
          description="Setelah kamu mengajukan materi, kamu bisa melihat pengajuanmu di sini."
          backButtonUrl="/pemateri-divisi"
        />
      ) : (
        <div
          className="mt-4 grid grid-cols-1 gap-4"
          style={{ gridTemplateRows: "auto 1fr" }}
        >
          <div className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
            <Widget
              icon={<Icons.mailCheck className="text-blue-500" />}
              title="Approved"
              subtitle={count.data.approved.toString()}
            />

            <Widget
              icon={<Icons.mailQuestion className="text-green-500" />}
              title="Pending"
              subtitle={count.data.pending.toString()}
            />

            <Widget
              icon={<Icons.mailWarning className="text-yellow-500" />}
              title="Rejected"
              subtitle={count.data.rejected.toString()}
            />

            <Widget
              icon={<Icons.mailX className="text-red-500" />}
              title="Draft"
              subtitle={count.data.draft.toString()}
            />
          </div>

          <Approves approvals={requests.data} pageCount={requests.totalPage} />
        </div>
      )}
    </DashboardShell>
  )
}
