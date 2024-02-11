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

  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.data.image}`}
      alt={knowledge.data.knowledge_title}
      className="aspect-video rounded-none object-cover shadow-md md:rounded-lg "
      width={1280}
      height={720}
    />
  )
}
