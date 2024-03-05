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

  if (knowledgeResp.code != 200) {
    return (
      <CardDashboard
        title="Materi Terbaru"
        icon="knowledge"
        name="-"
        image="/images/placeholder.svg"
        buttonText={`Lihat Materi`}
        disableButton
      />
    )
  } else {
    return (
      <CardDashboard
        title="Materi Terbaru"
        icon="knowledge"
        name={knowledgeResp.data.knowledge_title}
        image={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledgeResp.data.image}`}
        buttonText={`Lihat Materi`}
        url={`${baseUrl}/${knowledgeResp.data.id_knowledge}`}
      />
    )
  }
}
