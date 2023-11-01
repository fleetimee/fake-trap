import Link from "next/link"
import { redirect } from "next/navigation"

import { ApprovalOneRes } from "@/types/approval/res"
import { KnowledgeOneRes } from "@/types/knowledge/res"
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
import { Table, TableHeader, TableRow } from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

  const uuid = tokenExtract?.id

  const knowledge = await getOneKnowledge({
    idKnowledge: Number(params.idKnowledge),
    token: user.token,
  })

  const approval = await getOneApprovalKnowledge({
    idKnowledge: Number(params.idKnowledge),
    token: user.token,
  })

  console.log(approval)

  return (
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
          Revisi Pengajuan Pengetahuan ini akan dikirimkan ke pengaju
        </CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-8">
        <Table>
          <TableHeader>
            <TableRow></TableRow>
          </TableHeader>
        </Table>
      </CardContent>
    </Card>
  )
}
