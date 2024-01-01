import { getNewKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { CardDashboard } from "@/components/app/dashboard/ui"

interface DashboardKnowledgeHighlightProps {
  token: string | undefined
  userUuid?: string
  baseUrl: string
}

export async function DashboardKnowledgeHighlight({
  token,
  userUuid = "",
  baseUrl,
}: DashboardKnowledgeHighlightProps) {
  const knowledgeResp = await getNewKnowledge({
    token: token,
    userUuid: userUuid,
  })

  return (
    <CardDashboard
      title="Pengetahuan Terbaru"
      icon="knowledge"
      name={knowledgeResp.data.knowledge_title}
      image={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledgeResp.data.image}`}
      buttonText={`Lihat Pengetahuan`}
      url={`${baseUrl}/${knowledgeResp.data.id_knowledge}`}
    />
  )
}
