import Image from "next/image"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"

interface KnowledgeDetailProps {
  params: {
    idKnowledge: string
  }
}

export default async function KnowledgeDetail({
  params,
}: KnowledgeDetailProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledge = await getOneKnowledge({
    idKnowledge: params.idKnowledge,
    token: user?.token,
  })

  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.data.image}`}
      alt={knowledge.data.knowledge_title}
      className="aspect-video rounded-lg object-cover shadow-md "
      width={1280}
      height={720}
    />
  )
}