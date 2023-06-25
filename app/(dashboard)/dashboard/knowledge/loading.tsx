import { KnowledgeItemList } from "@/components/app/knowledge/knowledge-item-list"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function KnowledgeLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Pengetahuan"
        description="Pengetahuan yang tersedia di e-learning"
      />
      <div className="divide-border-200 divide-y rounded-md border">
        <KnowledgeItemList.Skeleton />
        <KnowledgeItemList.Skeleton />
        <KnowledgeItemList.Skeleton />
        <KnowledgeItemList.Skeleton />
        <KnowledgeItemList.Skeleton />
      </div>
    </DashboardShell>
  )
}
