import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { ApprovalStatus } from "@/lib/enums/status"
import { getSingleApprovalRequest } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { cn, convertDatetoString } from "@/lib/utils"
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

interface ApproveKnowledgeRevisionPageProps {
  params: {
    idApproval: string
  }
}

export const metadata: Metadata = {
  title: `Detail Pengajuan`,
}

export default async function ApproveKnowledgeRevisionPage({
  params,
}: ApproveKnowledgeRevisionPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const approvalRequest = await getSingleApprovalRequest({
    idApproval: params.idApproval,
    token: user?.token,
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
            title: "Approve",
          },
          {
            href: `/pemateri-divisi/approve/revision/${params.idApproval}`,
            title: `Detail Pengajuan #${params.idApproval}`,
          },
        ]}
      />

      <div className="lg:flex lg:items-start lg:space-x-10">
        <Card className="border-2 hover:border-primary lg:w-1/2">
          <CardHeader>
            <CardTitle>Preview Pengajuan</CardTitle>
            <CardDescription>
              Ini adalah pengajuan pengetahuan yang akan di approve
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="space-y-8 py-5">
            <div className="space-y-2">
              <Label className="font-bold">Judul Pengetahuan</Label>
              <div>
                <Link
                  href={`/pemateri-divisi/knowledge/detail/${approvalRequest.data.id_knowledge}`}
                  className="text-blue-500 hover:underline"
                >
                  {approvalRequest.data.knowledge_title}
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
              <Label className="font-bold">Tanggal Aksi</Label>
              <div id="bookDescriptionPreview">
                {convertDatetoString(
                  approvalRequest.data.approved_at.toString()
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
              <Label className="font-bold">Catatan</Label>
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

        <Card className="border-2 hover:border-primary lg:w-1/2">
          <CardHeader>
            <CardTitle>Revisi Pengajuan</CardTitle>
            <CardDescription>
              Form revisi pengajuan akan aktif jika pengajuan ditolak
            </CardDescription>
          </CardHeader>
          <Separator />

          <CardContent className="space-y-4">
            {/*<ApproverForm idApproval={params.idApproval} />*/}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}