import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { ApprovalCheckOne } from "@/types/approval/res/approval-check-get-one"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { KnowledgeRejectForm } from "./_components/rejected-form"


interface GetCheckKnowledgeProps {
  token: string | undefined
  id: string
}

async function getCheckKnowledge({
  token,
  id,
}: GetCheckKnowledgeProps): Promise<ApprovalCheckOne> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/0051/${id}`,
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

export const metadata: Metadata = {
  title: "Reject Pengajuan",
  description: "Reject Pengajuan",
}

interface RejectApproveFormProps {
  params: {
    id: string
  }
}

export default async function RejectApproveForm({
  params,
}: RejectApproveFormProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtract = extractToken(user.token)

  const uuid = tokenExtract?.id

  const checkKnowledge = await getCheckKnowledge({
    id: params.id,
    token: user?.token,
  })

  const isKnowledgeExist = checkKnowledge?.data?.is_exist

  if (!isKnowledgeExist) {
    notFound()
  }

  return (
    <Card>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between space-x-2">
          <CardTitle className="inline-flex items-center text-2xl">
            <span className="mr-2 inline-flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href="/supervisor-area/approval/approve-knowledge/pending">
                      <Icons.chevronLeft className="h-6 w-6" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="p-4">
                    Kembali ke halaman sebelumnya
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
            Reject Pengajuan
          </CardTitle>
          {/* <ProductPager product={product} /> */}
        </div>
        <CardDescription>
          Tolak pengajuan serta berikan alasan penolakan nantinya pemberi materi
          akan menerima notifikasi bahwa pengajuan telah ditolak
        </CardDescription>
      </CardHeader>
      <CardContent>
        <KnowledgeRejectForm id={params.id} uuid={uuid} />
      </CardContent>
    </Card>
  )
}
