import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { KnowledgeOneRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Icons } from "@/components/icons"
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
  TableCaption,
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

export default async function KnowledgeRequest({
  params,
}: KnowledgeRequestProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledgeData = await getOneKnowledge({
    token: user?.token,
    idKnowledge: parseInt(params.idKnowledge),
  })

  console.log(knowledgeData)

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
            Ajukan Pelatihan
          </CardTitle>
          {/* <ProductPager product={product} /> */}
        </div>
        <CardDescription>
          Ajukan pelatihan baru untuk ditinjau oleh supervisor
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="rounded-2xl border-2 border-solid border-gray-300">
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
      </CardContent>
    </Card>
  )
}
