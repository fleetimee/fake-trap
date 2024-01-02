import { Metadata } from "next"
import NotFoundLottie from "@/public/lottie/not-found.json"
import Balancer from "react-wrap-balancer"

import { getPemateriApprovalRequests } from "@/lib/fetcher/approval-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Approves } from "@/components/approves"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { LottieClient } from "@/components/lottie-anim"
import { NotFoundAnim } from "@/components/not-found-anim"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

      {
        //   Check if request is not empty
        //   If empty, show empty component

        requests.data.length === 0 ? (
          // <div className="flex h-full flex-col items-center justify-center space-y-6 py-3">
          //   <h1 className="text-2xl font-semibold uppercase text-gray-700 dark:text-gray-200">
          //     Belum ada pengajuan
          //   </h1>
          //   <LottieClient
          //     animationData={NotFoundLottie}
          //     className="h-full max-w-2xl"
          //   />
          //
          //   <h1
          //     className="whitespace-pre-wrap text-center font-heading text-lg uppercase
          //   text-gray-600 dark:text-gray-200
          //   "
          //   >
          //     <Balancer>
          //       {
          //         "Setelah kamu mengajukan materi,\n kamu bisa melihat pengajuanmu di sini."
          //       }
          //     </Balancer>
          //   </h1>
          //
          //   <Button>Kembali</Button>
          // </div>

          <NotFoundAnim
            animationData={NotFoundLottie}
            title="Belum ada pengajuan"
            description="Setelah kamu mengajukan materi, kamu bisa melihat pengajuanmu di sini."
            backButtonUrl="/pemateri-divisi"
          />
        ) : (
          <Approves approvals={requests.data} pageCount={requests.totalPage} />
        )
      }
    </DashboardShell>
  )
}
