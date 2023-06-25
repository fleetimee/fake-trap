import { Metadata } from "next"

import {
  getKnowledgeByid,
  headersObj,
} from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { DetailContent } from "@/components/app/knowledge/detail-content"
import DetailSidebarKnowledge from "@/components/app/knowledge/detail-sidebar-knowledge"
import { DashboardShell } from "@/components/shell"

type Props = {
  params: {
    detail: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detailKnowledgeData = await getKnowledgeByid(parseInt(params.detail))

  return {
    title: detailKnowledgeData.data.knowledge_title,
  }
}

export default async function DetailKnowledge({
  params,
}: {
  params: { detail: string }
}) {
  const detailKnowledgeData = await getKnowledgeByid(parseInt(params.detail))

  return (
    <DashboardShell>
      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <DetailContent data={detailKnowledgeData.data} />
        <DetailSidebarKnowledge data={detailKnowledgeData.data} />
      </div>
    </DashboardShell>
  )
}
