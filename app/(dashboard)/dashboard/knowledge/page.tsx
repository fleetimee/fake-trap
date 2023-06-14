import { getKnowledge } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { DashboardHeader } from "@/components/header"
import { KnowledgeItemList } from "@/components/knowledge-item-list"
import { DashboardShell } from "@/components/shell"

export default async function KnowledgePage() {
  const data = await getKnowledge(6)

  console.log(data)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Pengetahuan"
        description="Pengetahuan yang tersedia di e-learning"
      />
      <div className="divide-y divide-border rounded-md border">
        {data.data.map((item) => (
          <KnowledgeItemList key={item.id_knowledge} item={item} />
        ))}
      </div>
    </DashboardShell>
  )
}
