import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneSection } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"

interface KnowledgeContentArticleNewPageProps {
  params: {
    idKnowledge: string
    idSection: string
  }
}

export default async function KnowledgeContentArticleNewPage({
  params,
}: KnowledgeContentArticleNewPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const section = await getOneSection({
    token: user?.token,
    idSection: params.idSection,
  })

  if (section.code === 400) {
    return notFound()
  }
}
