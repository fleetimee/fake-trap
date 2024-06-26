import Image from "next/image"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"

interface KnowledgeDetailPageProps {
  params: {
    idKnowledge: string
  }
}

export default async function KnowledgeDetailPage({
  params,
}: KnowledgeDetailPageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledge = await getOneKnowledge({
    idKnowledge: params.idKnowledge,
    token: user?.token,
  })

  if (knowledge.data.created_by !== tokenExtracted?.id) {
    return notFound()
  }

  return (
    <Image
      priority
      src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.data.image}`}
      alt={knowledge.data.knowledge_title}
      className="aspect-video rounded-none object-cover shadow-md md:rounded-lg "
      width={1280}
      height={720}
    />
  )
}
