import { getCategory } from "@/lib/fetcher/category/category-fetcher"
import { getKnowledge } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { CreateKnowledgeButton } from "@/components/create-knowledge-button"
import { DashboardHeader } from "@/components/header"
import { KnowledgeItemList } from "@/components/knowledge-item-list"
import { DashboardShell } from "@/components/shell"

export default async function KnowledgePage() {
  const data = getKnowledge(1000)
  const dataCategory = getCategory(1000)

  const [knowledgeResp, categoryResp] = await Promise.all([data, dataCategory])

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Pengetahuan"
        description="Pengetahuan yang tersedia di e-learning"
      >
        <CreateKnowledgeButton categoryResponse={categoryResp} />
      </DashboardHeader>
      <div className="divide-y divide-border rounded-md border">
        {knowledgeResp.data.map((item) => (
          <KnowledgeItemList
            key={item.id_knowledge}
            item={item}
            category={categoryResp}
          />
        ))}
      </div>
    </DashboardShell>
  )
}
