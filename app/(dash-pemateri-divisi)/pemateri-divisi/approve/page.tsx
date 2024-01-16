import { Metadata } from "next"
import NotFoundLottie from "@/public/lottie/not-found.json"

import { getPemateriApprovalRequests } from "@/lib/fetcher/approval-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Approves } from "@/components/approves"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { NotFoundAnim } from "@/components/not-found-anim"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"

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
            heading="Pengajuan Materi / Pengetahuan"
            description="Ini merupakan daftar pengetahuan / materi yang sudah kamu ajukan ke atasanmu"
          />
        </MotionDiv>
      </div>

      <Separator />

      {requests.data.length === 0 ? (
        <NotFoundAnim
          animationData={NotFoundLottie}
          title="Belum ada pengajuan"
          description="Setelah kamu mengajukan materi, kamu bisa melihat pengajuanmu di sini."
          backButtonUrl="/pemateri-divisi"
        />
      ) : (
        <Approves approvals={requests.data} pageCount={requests.totalPage} />
      )}
    </DashboardShell>
  )
}
