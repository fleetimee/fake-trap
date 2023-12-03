import React from "react"
import Image from "next/image"
import { redirect } from "next/navigation"

import { KnowledgeOneRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"





interface GetOneKnowledgeProps {
  token: string | undefined
  idKnowledge: string
}

async function getOneKnowledge({
  token,
  idKnowledge,
}: GetOneKnowledgeProps): Promise<KnowledgeOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await res.json()
}

interface PreviewKnowledgeProps {
  params: {
    idKnowledge: string
  }
}

export default async function PreviewKnowledge({
  params,
}: PreviewKnowledgeProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledgeOneRes = await getOneKnowledge({
    token: user?.token,
    idKnowledge: params.idKnowledge,
  })

  return (
    <Image
      src={knowledgeOneRes?.data?.image}
      alt={knowledgeOneRes?.data?.knowledge_title}
      className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
      width={1280}
      height={720}
    />
  )
}
