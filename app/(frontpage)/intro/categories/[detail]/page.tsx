import { Metadata } from "next"

import { getOnePublicCategory } from "@/lib/fetcher/category-fetcher"
import { toTitleCase } from "@/lib/utils"
import { KnowledgeCard } from "@/components/cards/knowledge-card"
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
  const detailCategoryData = await getOnePublicCategory({
    idCategory: parseInt(params.detail),
  })

  console.log(detailCategoryData)

  return {
    title: `Kategori`,
  }
}

export default async function DetailIntroCategory({ params }: Props) {
  const detailCategoryData = await getOnePublicCategory({
    idCategory: parseInt(params.detail),
  })

  console.log(detailCategoryData)

  return (
    <Shell className="bg-[url(/hero_bg.svg)] bg-cover bg-no-repeat lg:bg-bottom">
      <BreadCrumbs
        isWhiteText
        segments={[
          {
            href: "/",
            title: "Frontpage",
          },
          // {
          //   title: toTitleCase(detailCategoryData.data.category_name),
          //   href: `/intro/categories/${detailCategoryData.data.id_category}`,
          // },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* <HeaderIntro
          isWhiteText
          title={toTitleCase(detailCategoryData.data.category_name)}
          description={`Jelajahi pengetahuan ${detailCategoryData.data.category_name} yang ada di E-learning`}
          size="sm"
        /> */}
      </MotionDiv>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!detailCategoryData.data
          ? null
          : detailCategoryData.data.map((knowledge) => (
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
