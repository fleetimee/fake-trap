import { DetailContent } from "@/components/detail-content"
import { DetailSidebarKnowledge } from "@/components/detail-sidebar-knowledge"
import { DashboardShell } from "@/components/shell"

export default function DetailKnowledge({
  params,
}: {
  params: { detail: string }
}) {
  return (
    <DashboardShell>
      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <DetailContent title={params.detail} />
        <DetailSidebarKnowledge />
      </div>
    </DashboardShell>
  )
}
