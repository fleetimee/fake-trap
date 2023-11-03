import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { ApprovalOneRes } from "@/types/approval/res"
import { KnowledgeOneRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { RevisionInformation } from "./_components/revision-information"
import { KnowledgeRevisionForm } from "./_components/revision-knowledge-form"

export const metadata: Metadata = {
  title: "Revisi Pengajuan Pengetahuan",
  description: "Revisi Pengajuan Pengetahuan",
}

interface KnowledgeRevisionProps {
  params: {
    idKnowledge: string
  }
}

interface GetOneKnowledgeProps {
  token: string | undefined
  idKnowledge: number
}

async function getOneKnowledge({
  token,
  idKnowledge,
}: GetOneKnowledgeProps): Promise<KnowledgeOneRes> {
  const knowledgeOne = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await knowledgeOne.json()
}

interface GetOneApprovalKnowledgeProps {
  token: string | undefined
  idKnowledge: number
}

async function getOneApprovalKnowledge({
  token,
  idKnowledge,
}: GetOneKnowledgeProps): Promise<ApprovalOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/detail/${idKnowledge}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await res.json()
}

export default async function KnowledgeRevision({
  params,
}: KnowledgeRevisionProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtract = extractToken(user.token)

  const knowledge = await getOneKnowledge({
    idKnowledge: Number(params.idKnowledge),
    token: user.token,
  })

  const approval = await getOneApprovalKnowledge({
    idKnowledge: Number(params.idKnowledge),
    token: user.token,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/dashboard",
            title: "Dashboard",
          },
          {
            href: "/dashboard/knowledge",
            title: "Pengetahuan",
          },
          {
            href: `/dashboard/knowledge/${params.idKnowledge}`,
            title: knowledge.data.knowledge_title,
          },
          {
            href: `/dashboard/knowledge/${params.idKnowledge}/revision-form`,
            title: "Revisi Pengajuan Pengetahuan",
          },
        ]}
      />
      <Card className="max-w-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between space-x-2">
            <CardTitle className="inline-flex items-center text-2xl">
              <span className="mr-2 inline-flex">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link href="/dashboard/knowledge">
                        <Icons.chevronLeft className="h-6 w-6" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="p-4">
                      Kembali ke halaman sebelumnya
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
              Revisi Pengajuan Pengetahuan
            </CardTitle>
            {/* <ProductPager product={product} /> */}
          </div>
          <CardDescription className="space-y-2 px-8 text-sm">
            Revisi Pengajuan Pengetahuan ini akan dikirimkan kembali ke
            supervisor
          </CardDescription>
        </CardHeader>
        <hr className="border-gray-200 py-2 dark:border-gray-700" />
        <CardContent className="grid grid-cols-1 gap-8">
          <RevisionInformation approval={approval} />
          <hr className="border-gray-200 py-2 dark:border-gray-700" />
          <KnowledgeRevisionForm
            idApproval={approval.data.id_approval_knowledge.toString()}
          />
          <Label className="text-sm text-red-400">
            Pastikan pengetahuan ini sudah di revisi sesuai dengan ketentuan
            Supervisor kemudian kirim ulang pengajuan ini
          </Label>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
