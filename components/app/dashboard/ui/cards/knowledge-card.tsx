import { KnowledgeListRes } from "@/types/knowledge/res"
import { CardDashboardIndicator } from "@/components/app/dashboard/ui/"





interface GetKnowledgeCountProps {
  token: string | undefined
}

async function getKnowledgeCount({
  token,
}: GetKnowledgeCountProps): Promise<KnowledgeListRes> {
  const knowledgeCountRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await knowledgeCountRes.json()
}

interface DashboardKnowledgeCardCountProps {
  token: string | undefined
}

export async function DashboardKnowledgeCardCount({
  token,
}: DashboardKnowledgeCardCountProps) {
  const knowledgeResp = await getKnowledgeCount({
    token: token,
  })

  return (
    <CardDashboardIndicator
      title="Pengetahuan"
      icon="knowledge"
      content={knowledgeResp.count}
      description="Pengetahuan yang tersedia"
    />
  )
}
