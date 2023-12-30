import Image from "next/image"
import { notFound } from "next/navigation"

import {
  getOnePublicKnowledge,
  lookupKnowledgePublic,
} from "@/lib/fetcher/knowledge-fetcher"
import { getCurrentUser } from "@/lib/session"

type Props = {
  params: {
    detail: string
  }
}

export default async function IntroDetailKnowledge({ params }: Props) {
  const user = await getCurrentUser()

  const knowledge = await getOnePublicKnowledge({
    idKnowledge: parseInt(params.detail),
  })

  const isPublic = await lookupKnowledgePublic({
    idKnowledge: parseInt(params.detail),
    token: user?.token,
  })

  if (!isPublic.data) {
    return notFound()
  }

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
