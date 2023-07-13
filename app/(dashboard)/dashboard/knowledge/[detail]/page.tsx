import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getKnowledgeDataById } from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import DetailSidebarKnowledge from "@/components/app/knowledge/detail-sidebar-knowledge"
import { KnowledgeDetailContent } from "@/components/app/knowledge/detail/knowledge-detail-content"
import { DashboardShell } from "@/components/shell"

type Props = {
  params: {
    detail: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getCurrentUser()

  const detailKnowledgeData = await getKnowledgeDataById({
    id: parseInt(params.detail),
    token: user?.token,
  })

  console.log(detailKnowledgeData)

  return {
    title: detailKnowledgeData.data.knowledge_title,
  }
}

export default async function DetailKnowledge({
  params,
}: {
  params: { detail: string }
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const detailKnowledgeData = await getKnowledgeDataById({
    id: parseInt(params.detail),
    token: user.token,
  })

  console.log(detailKnowledgeData)

  return (
    <DashboardShell>
      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <KnowledgeDetailContent data={detailKnowledgeData.data} />
        <DetailSidebarKnowledge data={detailKnowledgeData.data} />
      </div>
    </DashboardShell>
  )
}
