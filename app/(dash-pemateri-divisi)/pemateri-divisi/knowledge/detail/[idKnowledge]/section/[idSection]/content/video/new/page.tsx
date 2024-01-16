import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneSection } from "@/lib/fetcher/section-fetcher"
import { getCurrentUser } from "@/lib/session"
import { AddContentVideoForm } from "@/components/forms/add-content-video-form"

interface KnowledgeContentVideoNewPageProps {
  params: {
    idKnowledge: string
    idSection: string
  }
}

export default async function KnowledgeContentVideoNewPage({
  params,
}: KnowledgeContentVideoNewPageProps) {
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

  return (
    <AddContentVideoForm
      idSection={Number(params.idSection)}
      section={section.data}
    />
  )
}
