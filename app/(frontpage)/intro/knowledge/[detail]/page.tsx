import Image from "next/image"
import { notFound } from "next/navigation"

import { KnowledgeOneRes } from "@/types/knowledge/res"
import { getOnePublicKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"

interface LookupKnowledgePublicProps {
  token: string | undefined
  idKnowledge: number
}

async function lookupKnowledgePublic({
  token,
  idKnowledge,
}: LookupKnowledgePublicProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}/public`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "application/json",
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

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
