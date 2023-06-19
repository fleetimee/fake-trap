import { getKnowledge } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { DashboardHeader } from "@/components/header"
import { KnowledgeCreateButton } from "@/components/knowledge-create-button"
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
      >
        <KnowledgeCreateButton
          className=" transition duration-300 delay-150 ease-in-out hover:-translate-y-1 hover:scale-110"
          name="Tambah"
        />
      </DashboardHeader>
      <div className="divide-y divide-border rounded-md border">
        {data.data.map((item) => (
          <KnowledgeItemList key={item.id_knowledge} item={item} />
        ))}
      </div>
    </DashboardShell>
  )
}
