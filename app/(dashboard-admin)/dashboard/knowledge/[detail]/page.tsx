import { Metadata } from "next"
import { redirect } from "next/navigation"

import { KnowledgeOneRes } from "@/types/knowledge/res"
import { ReferenceListRes } from "@/types/references/res"
import { authOptions } from "@/lib/auth"
import { getKnowledgeDataById } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { KnowledgeDetailShell } from "@/components/app/knowledge/detail/ui"
import { DashboardShell } from "@/components/shell"





type DetailKnowledgeProps = {
  params: {
    detail: string
  }
}

export async function generateMetadata({
  params,
}: DetailKnowledgeProps): Promise<Metadata> {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const detailKnowledgeData = await getKnowledgeDataById({
    id: parseInt(params.detail),
    token: user?.token,
  })

  return {
    title: detailKnowledgeData.data.knowledge_title,
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

interface GetContentTypeProps {
  token: string | undefined
  refCode: string
}

async function getContentType({
  token,
  refCode,
}: GetContentTypeProps): Promise<ReferenceListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/references/${refCode}`,
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

export default async function DetailKnowledge({
  params,
}: DetailKnowledgeProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [detailKnowledgeData, contentTypeData] = await Promise.all([
    getOneKnowledge({
      token: user.token,
      idKnowledge: parseInt(params.detail),
    }),
    getContentType({
      token: user.token,
      refCode: "001",
    }),
  ])

  return (
    <DashboardShell>
      <KnowledgeDetailShell
        detailKnowledgeData={detailKnowledgeData}
        contentTypeData={contentTypeData.data}
      />
    </DashboardShell>
  )
}
