import { redirect } from "next/navigation"

import { KnowledgeOneRes } from "@/types/knowledge/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

import RenderContentWrapper from "./_components/render-content-wrapper"


interface GetOneContentProps {
  token: string | undefined
  idContent: string
}

async function getOneContent({ token, idContent }: GetOneContentProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/${idContent}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetOneKnowledgeProps {
  token: string | undefined
  idKnowledge: number
}

async function getOneKnowledge({
  token,
  idKnowledge,
}: GetOneKnowledgeProps): Promise<KnowledgeOneRes> {
  const knowledgeOne = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await knowledgeOne.json()
}

interface KnowledgePreviewContentProps {
  params: {
    idKnowledge: string
    content: string
  }
}

export default async function KnowledgePreviewContent({
  params,
}: KnowledgePreviewContentProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [knowledgeRes, contentRes] = await Promise.all([
    getOneKnowledge({
      token: user?.token,
      idKnowledge: parseInt(params.idKnowledge),
    }),
    getOneContent({
      token: user?.token,
      idContent: params.content,
    }),
  ])

  return (
    <RenderContentWrapper
      detailKnowledge={knowledgeRes}
      contentData={contentRes.data}
      contentType={contentRes.data.content_type}
    />
  )
}
