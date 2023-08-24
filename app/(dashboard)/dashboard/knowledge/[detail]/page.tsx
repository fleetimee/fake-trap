import { Metadata } from "next"
import { redirect } from "next/navigation"

import { KnowledgeOneRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getKnowledgeDataById } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { KnowledgeDetailShell } from "@/components/app/knowledge/detail"
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

export default async function DetailKnowledge({
  params,
}: DetailKnowledgeProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const detailKnowledgeData = await getOneKnowledge({
    token: user.token,
    idKnowledge: parseInt(params.detail),
  })

  return (
    <DashboardShell>
      <KnowledgeDetailShell detailKnowledgeData={detailKnowledgeData} />
    </DashboardShell>
  )
}
