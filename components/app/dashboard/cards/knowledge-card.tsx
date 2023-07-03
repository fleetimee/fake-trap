import { Knowledge } from "@/types/knowledge-res"
import { getCurrentUser } from "@/lib/session"

import { CardDashboardIndicator } from "../card-dashboard-indicator"

async function getKnowledge(token: string | undefined): Promise<Knowledge> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge?limit=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function DashboardKnowledgeCardCount(props: {
  token: string | undefined
}) {
  const knowledgeResp = await getKnowledge(props.token)

  return (
    <CardDashboardIndicator
      title="Pengetahuan"
      icon="knowledge"
      content={knowledgeResp.count}
      description="Pengetahuan yang tersedia"
    />
  )
}
