import { getOperatorKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { CardDashboardIndicator } from "@/components/app/dashboard/ui/"

interface DashboardKnowledgeCardCountProps {
  token: string
}

export async function DashboardKnowledgeCardCount({
  token,
}: DashboardKnowledgeCardCountProps) {
  const knowledgeResp = await getOperatorKnowledge({
    limit: 1,
    page: 1,
    token: token,
  })

  return (
    <CardDashboardIndicator
      title="Materi"
      icon="knowledge"
      content={knowledgeResp.count}
      description="Materi yang tersedia"
    />
  )
}
