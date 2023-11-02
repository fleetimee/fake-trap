import { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { KnowledgeRequestForm } from "./_components/request-knowledge-form"

export const metadata: Metadata = {
  title: "Ajukan Pengetahuan",
  description: "Ajukan Pengetahuan",
}

interface KnowledgeRequestProps {
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

interface LookupKnowledgeProps {
  token: string | undefined
  idKnowledge: number
}

async function lookupKnowledge({ token, idKnowledge }: LookupKnowledgeProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}/lookup`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

export default async function KnowledgeRequest({
  params,
}: KnowledgeRequestProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtract = extractToken(user.token)

  const uuid = tokenExtract?.id

  const knowledgeData = await getOneKnowledge({
    token: user?.token,
    idKnowledge: parseInt(params.idKnowledge),
  })

  const knowledgeLookup = await lookupKnowledge({
    token: user?.token,
    idKnowledge: parseInt(params.idKnowledge),
  })

  if (knowledgeLookup.data) {
    return notFound()
  }

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
            title: knowledgeData.data.knowledge_title,
          },
          {
            href: `/dashboard/knowledge/${params.idKnowledge}/request-form`,
            title: "Ajukan Pengetahuan",
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
              Ajukan Pengetahuan
            </CardTitle>
            {/* <ProductPager product={product} /> */}
          </div>
          <CardDescription className="space-y-2 px-8 text-sm">
            Ajukan Pengetahuan baru untuk ditinjau oleh supervisor
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Jumlah Section</TableHead>
                <TableHead className="text-right">Tgl Pembuatan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  {knowledgeData.data.id_knowledge}
                </TableCell>
                <TableCell>{knowledgeData.data.knowledge_title}</TableCell>
                <TableCell>
                  {knowledgeData.data.section
                    ? knowledgeData.data.section.length
                    : 0}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(knowledgeData.data.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <KnowledgeRequestForm idKnowledge={params.idKnowledge} uuid={uuid} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
