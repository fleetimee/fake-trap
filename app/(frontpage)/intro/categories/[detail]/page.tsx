import { Metadata } from "next"

import { CategoryOneRes } from "@/types/category/res"
import { getPublicCategoriesDataById } from "@/lib/datasource"
import { toTitleCase } from "@/lib/utils"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui/public-knowledge-card"
import { HeaderIntro } from "@/components/category-header"
import { MotionDiv } from "@/components/framer-wrapper"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
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

  return {
    title: `Kategori - ${detailCategoryData.data.category_name}`,
  }
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

export default async function DetailIntroCategory({ params }: Props) {
  const detailCategoryData = await getOnePublicCategory({
    idCategory: parseInt(params.detail),
  })

  return (
    <Shell className="bg-[url(/hero_bg.svg)] bg-cover bg-no-repeat lg:bg-bottom">
      <BreadCrumbs
        segments={[
          {
            href: "/intro",
            title: "Explore",
          },
          {
            title: toTitleCase(detailCategoryData.data.category_name),
            href: `/intro/categories/${detailCategoryData.data.id_category}`,
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <HeaderIntro
          title={toTitleCase(detailCategoryData.data.category_name)}
          description={`Jelajahi pengetahuan ${detailCategoryData.data.category_name} yang ada di E-learning`}
          size="sm"
        />
      </MotionDiv>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!detailCategoryData.data.knowledge
          ? null
          : detailCategoryData.data.knowledge.map((knowledge) => (
              <KnowledgeCard
                key={knowledge.id_knowledge}
                knowledge={knowledge}
                link={`/intro/knowledge/${knowledge.id_knowledge}`}
              />
            ))}
      </div>
    </Shell>
  )
}
