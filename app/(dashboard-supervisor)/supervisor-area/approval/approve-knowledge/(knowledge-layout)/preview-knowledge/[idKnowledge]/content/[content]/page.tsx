import { redirect } from "next/navigation"

import { ReferenceListRes } from "@/types/references/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

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

interface GetContentTypeProps {
  token: string | undefined
  refCode: string
}

async function getContentType({
  token,
  refCode,
}: GetContentTypeProps): Promise<ReferenceListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/references/${refCode}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await res.json()
}

interface KnowledgePreviewContentProps {
  params: {
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

  return <p>KnowledgePreviewContent</p>
}
