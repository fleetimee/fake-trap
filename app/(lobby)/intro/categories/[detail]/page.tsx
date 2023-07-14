import { Metadata } from "next"

import { getPublicCategoriesDataById } from "@/lib/datasource"
import { toTitleCase } from "@/lib/utils"
import { HeaderIntro } from "@/components/category-header"
import { PublicKnowledgeCard } from "@/components/public-knowledge-card"
import { Shell } from "@/components/shell/lobby-shell"

type Props = {
  params: {
    detail: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detailCategoryData = await getPublicCategoriesDataById({
    id: parseInt(params.detail),
  })

  console.log(detailCategoryData)

  return {
    title: `Kategori - ${detailCategoryData.data.category_name}`,
  }
}

export default async function DetailIntroCategory({ params }: Props) {
  const detailCategoryData = await getPublicCategoriesDataById({
    id: parseInt(params.detail),
  })

  console.log(detailCategoryData)

  return (
    <Shell>
      <HeaderIntro
        title={toTitleCase(detailCategoryData.data.category_name)}
        description={`Jelajahi pengetahuan ${detailCategoryData.data.category_name} yang ada di E-learning`}
        size="sm"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {detailCategoryData.data.knowledge.map((knowledge) => (
          <PublicKnowledgeCard
            key={knowledge.id_knowledge}
            knowledge={knowledge}
          />
        ))}
      </div>
    </Shell>
  )
}
