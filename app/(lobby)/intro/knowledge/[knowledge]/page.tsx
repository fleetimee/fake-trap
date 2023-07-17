"use client"

import { Metadata } from "next"
import { RocketIcon } from "@radix-ui/react-icons"

import {
  getPublicCategoriesDataById,
  getPublicKnowledgeDataById,
} from "@/lib/datasource"
import { toSentenceCase, toTitleCase } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PublicKnowledgeDetailShell } from "@/components/app/public-knowledge/public-knowledge-shell"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Shell } from "@/components/shell/lobby-shell"

type DetailContentProps = {
  params: {
    knowledge: string
  }
}

export async function generateMetadata({
  params,
}: DetailContentProps): Promise<Metadata> {
  const detailKnowledgeData = await getPublicKnowledgeDataById({
    id: parseInt(params.knowledge),
  })

  return {
    title: detailKnowledgeData.data.knowledge_title,
  }
}

export default async function IntroDetailKnowledge({
  params,
}: DetailContentProps) {
  const detailKnowledgeData = getPublicKnowledgeDataById({
    id: parseInt(params.knowledge),
  })

  const [detailKnowledgeDataResp] = await Promise.all([detailKnowledgeData])

  const detailCategoryResp = await getPublicCategoriesDataById({
    id: detailKnowledgeDataResp.data.id_category,
  })

  return (
    <Shell>
      <div className="flex flex-row gap-4 px-2">
        <Alert className="basis-full">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Informasi!</AlertTitle>
          <AlertDescription>
            Kursus ini berdasarkan pada pengetahuan{" "}
            {/* <span className="font-bold">
              {courseKnowledgeResp.data.knowledge_title}
            </span> */}
          </AlertDescription>
        </Alert>
      </div>

      <BreadCrumbs
        segments={[
          {
            href: "/intro",
            title: "Intro",
          },
          {
            title: toTitleCase(detailCategoryResp.data.category_name),
            href: `/intro/categories/${detailCategoryResp.data.id_category}`,
          },
          {
            title: toSentenceCase(detailKnowledgeDataResp.data.knowledge_title),
            href: `/intro/knowledge/${detailKnowledgeDataResp.data.id_knowledge}`,
          },
        ]}
      />

      <PublicKnowledgeDetailShell
        detailKnowledgeDataResp={detailKnowledgeDataResp}
      />
    </Shell>
  )
}
