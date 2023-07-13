import { Metadata } from "next"

import { getPublicCategoriesDataById } from "@/lib/datasource"
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
      <p>{detailCategoryData.data.category_name}</p>
    </Shell>
  )
}
