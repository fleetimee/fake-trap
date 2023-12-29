import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { ApprovalStatus } from "@/lib/enums/status"
import { getDetailCourseApproval } from "@/lib/fetcher/approval-fetcher"
import { getCurrentUser } from "@/lib/session"
import { cn, convertDatetoString, extractToken } from "@/lib/utils"
import { ApproverCourseForm } from "@/components/forms/course-approver-form"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Form Approve",
}

interface SupervisorLmsConfirmationPageProps {
  params: {
    idApproval: string
  }
}

export default async function SupervisorLmsConfirmationPage({
  params,
}: SupervisorLmsConfirmationPageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const approvalRequest = await getDetailCourseApproval({
    idApproval: params.idApproval,
    token: user?.token,
  })

  const isApprover = approvalRequest.data?.approver_id === tokenExtracted?.id
  const isApprovalExist = approvalRequest.code === 200
  const isApprovalStatusPending =
    approvalRequest.data?.status === ApprovalStatus.PENDING

  if (!isApprover || !isApprovalExist) {
    return notFound()
  }

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
            title: "Approval",
          },
          {
            href: `#`,
            title: "Form Approve",
          },
        ]}
      />

      <div className="lg:flex lg:items-start lg:space-x-10">
        <Card className="border-2 hover:border-primary lg:w-1/2">
          <CardHeader>
            <CardTitle>Preview Pengajuan</CardTitle>
            <CardDescription>
              Ini adalah pengajuan pelatihan yang akan di approve
            </CardDescription>
          </CardHeader>
          <Separator />

          <CardContent className="space-y-8 py-5">
            <div className="space-y-2">
              <Label className="font-bold">Judul Pelatihan</Label>
              <div>
                <Link
                  href={`/supervisor-lms/approval/detail/${params.idApproval}/course/${approvalRequest.data.id_course}`}
                  className="text-blue-500 hover:underline"
                >
                  {approvalRequest.data.course_name}
                </Link>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-bold">Nama Pengaju</Label>
              <div id="bookDescriptionPreview">
                {approvalRequest.data.requester_name}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold">Tanggal Pengajuan</Label>
              <div id="bookDescriptionPreview">
                {convertDatetoString(
                  approvalRequest.data.created_at.toString()
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold">Status</Label>
              <div id="bookDescriptionPreview">
                <Badge
                  className={cn({
                    "bg-green-500":
                      approvalRequest.data.status === ApprovalStatus.APPROVED,
                    "bg-yellow-500":
                      approvalRequest.data.status === ApprovalStatus.PENDING,
                    "bg-red-500":
                      approvalRequest.data.status === ApprovalStatus.REJECTED,
                  })}
                >
                  {approvalRequest.data.status_text}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold">
                Catatan dari: {approvalRequest.data.requester_name}
              </Label>
              <div
                id="bookDescriptionPreview"
                className="min-h-[200px] w-full rounded-2xl border-2 border-black bg-amber-100 dark:border-white dark:bg-gray-800"
              >
                <p className="p-6 font-heading dark:text-white">
                  {approvalRequest.data.comment}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn({
            "border-2 hover:border-primary lg:w-1/2": isApprovalStatusPending,
            hidden: !isApprovalStatusPending,
          })}
        >
          <CardHeader>
            <CardTitle>Submit Pengajuan</CardTitle>
            <CardDescription>
              Ini adalah form untuk melakukan approve pengajuan atau menolak
              untuk kembali di revisi oleh pengaju
            </CardDescription>
          </CardHeader>
          <Separator />

          <CardContent className="space-y-4">
            <ApproverCourseForm idApproval={params.idApproval} />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
