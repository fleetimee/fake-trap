import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"

import { CategoryOneRes } from "@/types/category/res"
import { KnowledgeOneRes } from "@/types/knowledge/res"
import { getCurrentUser } from "@/lib/session"
import { toSentenceCase, toTitleCase } from "@/lib/utils"
import { PublicKnowledgeDetailShell } from "@/components/app/public-knowledge/detail/ui"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Shell } from "@/components/shell/lobby-shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

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

interface GetOnePublicKnowledgeProps {
  idKnowledge: number
}

export async function getOnePublicKnowledge({
  idKnowledge,
}: GetOnePublicKnowledgeProps): Promise<KnowledgeOneRes> {
  const knowledgeOnePublic = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/public/knowledge/${idKnowledge}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
      },
      cache: "no-store",
    }
  )
  return await knowledgeOnePublic.json()
}

interface GetOnePublicCategoryProps {
  idCategory: number
}

async function getOnePublicCategory({
  idCategory,
}: GetOnePublicCategoryProps): Promise<CategoryOneRes> {
  const categoryOnePublic = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/public/category/${idCategory}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
      },
      cache: "no-store",
    }
  )
  return await categoryOnePublic.json()
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

  const [detailKnowledgeResult] = await Promise.all([knowledge])

  const detailCategory = await getOnePublicCategory({
    idCategory: detailKnowledgeResult.data.id_category,
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
