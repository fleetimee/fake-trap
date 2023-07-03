import { NewestKnowledge } from "@/types/newest-knowledge-res"

import { CardDashboard } from "../card-dashboard"

async function getNewestKnowledge(
  token: string | undefined
): Promise<NewestKnowledge> {
  try {
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

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function DashboardKnowledgeHighlight(props: {
  token: string | undefined
}) {
  const knowledgeResp = await getNewestKnowledge(props.token)

  return (
    <CardDashboard
      title="Pengetahuan"
      icon="knowledge"
      name={knowledgeResp.data.knowledge_title}
      image={knowledgeResp.data.image}
    />
  )
}
