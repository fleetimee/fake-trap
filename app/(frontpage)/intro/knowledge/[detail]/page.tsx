import { Metadata } from "next"
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

async function getOnePublicKnowledge({
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detailKnowledgeData = await getOnePublicKnowledge({
    idKnowledge: parseInt(params.detail),
  })

  return {
    title: `Pengetahuan ${detailKnowledgeData.data.knowledge_title}`,
  }
}

export default async function IntroDetailKnowledge({ params }: Props) {
  const user = await getCurrentUser()

  const detailKnowledge = getOnePublicKnowledge({
    idKnowledge: parseInt(params.detail),
  })

  const [detailKnowledgeResult] = await Promise.all([detailKnowledge])

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
    <Shell>
      <BreadCrumbs
        segments={[
          {
            href: "/intro",
            title: "Explore",
          },
          {
            title: toTitleCase(detailCategory.data.category_name),
            href: `/intro/categories/${detailCategory.data.id_category}`,
          },
          {
            title: toSentenceCase(detailKnowledgeResult.data.knowledge_title),
            href: `/intro/knowledge/${detailKnowledgeResult.data.id_knowledge}`,
          },
        ]}
      />
      <div className="flex flex-row gap-4 px-2">
        <Alert
          className="basis-full"
          variant={user ? "default" : "destructive"}
        >
          <Icons.course className="h-4 w-4" />
          <AlertTitle>
            {detailKnowledgeResult.data.course
              ? `
              Ada ${detailKnowledgeResult.data.course.length} pelatihan yang tersedia untuk pengetahuan ini`
              : `Tidak ada pelatihan untuk pengetahuan ini`}
          </AlertTitle>
          <AlertDescription>
            {user
              ? `Pergi ke panel mu untuk melihat pelatihan ini`
              : `Kamu harus login untuk mengakses pelatihan`}
          </AlertDescription>
        </Alert>
      </div>
      <PublicKnowledgeDetailShell detailKnowledge={detailKnowledgeResult} />
    </Shell>
  )
}
