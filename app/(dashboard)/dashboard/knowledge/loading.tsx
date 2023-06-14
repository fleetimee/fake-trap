import { DashboardHeader } from "@/components/header"
import { KnowledgeItemList } from "@/components/knowledge-item-list"
import { DashboardShell } from "@/components/shell"

export default function KnowledgeLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="..." description="..."></DashboardHeader>
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
