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

  console.log(knowledgeResp)

  if (knowledgeResp.code != 200) {
    return (
      <CardDashboard
        title="Pengeahuan Terbaru"
        icon="knowledge"
        name="-"
        image="/images/placeholder.svg"
        buttonText={`Lihat Pengetahuan`}
        disableButton
      />
    )
  } else {
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
}
