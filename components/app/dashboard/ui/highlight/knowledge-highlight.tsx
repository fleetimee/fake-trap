import { getNewKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { CardDashboard } from "@/components/app/dashboard/ui"

interface DashboardKnowledgeHighlightProps {
  token: string | undefined
}

export async function DashboardKnowledgeHighlight({
  token,
}: DashboardKnowledgeHighlightProps) {
  const knowledgeResp = await getNewKnowledge({ token })

  return (
    <CardDashboard
      title="Pengetahuan Terbaru"
      icon="knowledge"
      name={knowledgeResp.data.knowledge_title}
      image={knowledgeResp.data.image}
      buttonText={`Lihat Pengetahuan`}
      url={`/dashboard/knowledge/${knowledgeResp.data.id_knowledge}`}
    />
  )
}
