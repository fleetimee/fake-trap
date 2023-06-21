import { getKnowledgeByid } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { DetailContent } from "@/components/detail-content"
import DetailSidebarKnowledge from "@/components/detail-sidebar-knowledge"
import { DashboardShell } from "@/components/shell"

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
