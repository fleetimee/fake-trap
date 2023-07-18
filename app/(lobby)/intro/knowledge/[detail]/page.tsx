import { Metadata } from "next"
import { RocketIcon } from "@radix-ui/react-icons"

import {
  getPublicCategoriesDataById,
  getPublicKnowledgeDataById,
} from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { toSentenceCase, toTitleCase } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PublicKnowledgeDetailShell } from "@/components/app/public-knowledge/public-knowledge-shell"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Shell } from "@/components/shell/lobby-shell"

type Props = {
  params: {
    detail: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detailKnowledgeData = await getPublicKnowledgeDataById({
    id: parseInt(params.detail),
  })

  return {
    title: `Pengetahuan ${detailKnowledgeData.data.knowledge_title}`,
  }
}

export default async function IntroDetailKnowledge({ params }: Props) {
  const user = await getCurrentUser()

  const detailKnowledgeData = getPublicKnowledgeDataById({
    id: parseInt(params.detail),
  })

  const [detailKnowledgeDataResp] = await Promise.all([detailKnowledgeData])

  const detailCategoryResp = await getPublicCategoriesDataById({
    id: detailKnowledgeDataResp.data.id_category,
  })

  return (
    <Shell>
      <BreadCrumbs
        segments={[
          {
            href: "/intro",
            title: "Explore",
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
      <div className="flex flex-row gap-4 px-2">
        <Alert
          className="basis-full"
          variant={user ? "default" : "destructive"}
        >
          <Icons.course className="h-4 w-4" />
          <AlertTitle>
            {detailKnowledgeDataResp.data.course
              ? `
              Ada ${detailKnowledgeDataResp.data.course.length} kursus yang tersedia untuk pengetahuan ini`
              : `Tidak ada kursus untuk pengetahuan ini`}
          </AlertTitle>
          <AlertDescription>
            {user
              ? `Pergi ke panel mu untuk melihat kursus ini`
              : `Kamu harus login untuk mengakses kursus`}
          </AlertDescription>
        </Alert>
      </div>
      <PublicKnowledgeDetailShell
        detailKnowledgeDataResp={detailKnowledgeDataResp}
      />
    </Shell>
  )
}
