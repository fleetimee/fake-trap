import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import {
  CalendarIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  FileTextIcon,
  LightningBoltIcon,
  PersonIcon,
  UpdateIcon,
} from "@radix-ui/react-icons"
import { BookOpenIcon } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { ApprovalStatus } from "@/lib/enums/status"
import { getDetailKnowledgeApproval } from "@/lib/fetcher/approval-fetcher"
import { getCurrentUser } from "@/lib/session"
import { cn, convertDatetoString, extractToken } from "@/lib/utils"
import { RequesterRevisionForm } from "@/components/forms/requester-revision-form"
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

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const approvalRequest = await getDetailKnowledgeApproval({
    idApproval: params.idApproval,
    token: user?.token,
  })

  const isUserRequester =
    approvalRequest.data.requester_id === tokenExtracted.id
  const isApprovalStatusRejected =
    approvalRequest.data.status === ApprovalStatus.REJECTED
  const isApprovalAvailable = approvalRequest.code === 200

  if (!isApprovalAvailable && !isUserRequester) {
    return notFound()
  }

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

      <div className="container mx-auto space-y-8 p-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
              <div className="flex items-center gap-3">
                <FileTextIcon className="h-6 w-6" />
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Detail Pengajuan
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Informasi lengkap pengajuan materi
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="divide-y divide-gray-100 p-6">
              <div className="space-y-6 pb-6">
                <PreviewItem
                  icon={<BookOpenIcon className="h-4 w-4 text-blue-500" />}
                  label="Judul Materi"
                  value={
                    <Link
                      href={`/pemateri-divisi/knowledge/detail/${approvalRequest.data.id_knowledge}`}
                      className="text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {approvalRequest.data.knowledge_title}
                    </Link>
                  }
                />
                <PreviewItem
                  icon={<UpdateIcon className="h-4 w-4 text-blue-500" />}
                  label="Status Pengajuan"
                  value={
                    <Badge
                      className={cn("px-4 py-1", {
                        "bg-green-100 text-green-700":
                          approvalRequest.data.status ===
                          ApprovalStatus.APPROVED,
                        "bg-yellow-100 text-yellow-700":
                          approvalRequest.data.status ===
                          ApprovalStatus.PENDING,
                        "bg-red-100 text-red-700":
                          approvalRequest.data.status ===
                          ApprovalStatus.REJECTED,
                      })}
                    >
                      {approvalRequest.data.status_text}
                    </Badge>
                  }
                />
              </div>

              <div className="space-y-6 py-6">
                <PreviewItem
                  icon={<PersonIcon className="h-4 w-4 text-blue-500" />}
                  label="Nama Pengaju"
                  value={approvalRequest.data.requester_name}
                />
                <PreviewItem
                  icon={<CalendarIcon className="h-4 w-4 text-blue-500" />}
                  label="Tanggal Pengajuan"
                  value={convertDatetoString(
                    approvalRequest.data.created_at.toString()
                  )}
                />
                <PreviewItem
                  icon={<CalendarIcon className="h-4 w-4 text-blue-500" />}
                  label="Tanggal Aksi"
                  value={convertDatetoString(
                    approvalRequest.data.approved_at.toString()
                  )}
                />
              </div>

              <div className="pt-6">
                <Label className="flex items-center gap-2 font-bold">
                  <FileTextIcon className="h-4 w-4 text-blue-500" />
                  Catatan
                </Label>
                <div className="mt-3 rounded-lg bg-amber-50 p-4 font-medium text-amber-900">
                  {approvalRequest.data.comment}
                </div>
              </div>
            </CardContent>
          </Card>

          {isApprovalStatusRejected ? (
            <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-400 text-white">
                <CardTitle className="text-2xl font-bold">
                  Form Revisi
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Silakan submit revisi pengajuan Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RequesterRevisionForm
                  idApproval={approvalRequest.data.id_approval.toString()}
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
              <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-400 text-white">
                <div className="flex items-center gap-3">
                  <LightningBoltIcon className="h-6 w-6" />
                  <div>
                    <CardTitle className="text-2xl font-bold">
                      Status Pengajuan
                    </CardTitle>
                    <CardDescription className="text-gray-100">
                      Informasi status terkini
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center p-12">
                {approvalRequest.data.status === ApprovalStatus.APPROVED ? (
                  <div className="text-center">
                    <CheckCircledIcon className="mx-auto h-16 w-16 text-green-500" />
                    <h3 className="mt-4 text-xl font-semibold text-green-700">
                      Pengajuan Diterima
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Pengajuan Anda telah disetujui dan dapat dilanjutkan
                    </p>
                  </div>
                ) : approvalRequest.data.status === ApprovalStatus.PENDING ? (
                  <div className="text-center">
                    <UpdateIcon className="mx-auto h-16 w-16 animate-spin text-yellow-500" />
                    <h3 className="mt-4 text-xl font-semibold text-yellow-700">
                      Menunggu Review
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Pengajuan Anda sedang dalam proses review
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <CrossCircledIcon className="mx-auto h-16 w-16 text-red-500" />
                    <h3 className="mt-4 text-xl font-semibold text-red-700">
                      Pengajuan Ditolak
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Silakan cek catatan revisi dan lakukan perbaikan
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}

// Helper component for consistent preview items
function PreviewItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
        {icon}
        {label}
      </Label>
      <div className="ml-6 text-gray-900">{value}</div>
    </div>
  )
}
