import { KnowledgeGetNewRes } from "@/types/knowledge/res/knowledge-get-new"
import { CardDashboard } from "@/components/app/dashboard/card-dashboard"

interface GetNewKnowledgeProps {
  token: string | undefined
}

async function getNewKnowledge({
  token,
}: GetNewKnowledgeProps): Promise<KnowledgeGetNewRes> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/newest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

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
    />
  )
}
