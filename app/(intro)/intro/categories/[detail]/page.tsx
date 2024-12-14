import { Metadata } from "next"
import Image from "next/image"
import { BookOpenIcon } from "lucide-react"

import {
  getOnePublicCategory,
  getOnePublicCategoryDetail,
} from "@/lib/fetcher/category-fetcher"
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
  const publicCategories = await getOnePublicCategory({
    idCategory: parseInt(params.detail),
  })

  const category = await getOnePublicCategoryDetail({
    idCategory: parseInt(params.detail),
  })

  return {
    title: `${toTitleCase(category.data.category_name)}`,
  }
}

export default async function DetailIntroCategory({ params }: Props) {
  const publicCategories = await getOnePublicCategory({
    idCategory: parseInt(params.detail),
  })

  const category = await getOnePublicCategoryDetail({
    idCategory: parseInt(params.detail),
  })

  return (
    <Shell className="bg-[url(/hero_bg.svg)] bg-cover bg-no-repeat lg:bg-bottom">
      <BreadCrumbs
        isWhiteText
        segments={[
          {
            href: "/",
            title: "Frontpage",
          },
          {
            title: toTitleCase(category.data.category_name),
            href: `/intro/categories/${category.data.id_category}`,
          },
        ]}
      />

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          {/* Category Header with Image */}
          <div className="relative h-[300px] overflow-hidden rounded-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${category.data.image}`}
              alt={category.data.category_name}
              fill
              priority
              className="object-cover object-center"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h1 className="mb-2 text-2xl font-bold text-white">
                {toTitleCase(category.data.category_name)}
              </h1>
            </div>
          </div>

          {!publicCategories.data || publicCategories.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg bg-blue-50 py-16">
              <BookOpenIcon className="mb-4 size-16 text-blue-400" />
              <h2 className="mb-2 text-xl font-semibold text-blue-900">
                Belum Ada Materi
              </h2>
              <p className="text-center text-blue-700">
                Materi untuk kategori ini sedang dalam proses pengembangan.
                <br />
                Silakan cek kembali nanti.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold leading-relaxed text-gray-700">
                Berikut adalah materi yang tersedia di modul ini:
              </h2>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {publicCategories.data.map((knowledge) => (
                  <KnowledgeCard
                    key={knowledge.id_knowledge}
                    knowledge={knowledge}
                    link={`/intro/knowledge/${knowledge.id_knowledge}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Shell>
  )
}
