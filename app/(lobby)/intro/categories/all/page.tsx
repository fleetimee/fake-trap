import Image from "next/image"
import Link from "next/link"
import { Variants } from "framer-motion"

import { CategoryListRes } from "@/types/category/res"
import { cn } from "@/lib/utils"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui"
import { HeaderIntro } from "@/components/category-header"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Shell } from "@/components/shell/lobby-shell"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"

import { CategoryWrapper } from "./_components/category-wrapper"

export const metadata = {
  title: "Semua Kategori",
  description: "Explore our products and services.",
}

interface GetPublicCategoriesProps {
  limit: number
  page: number
}

async function getPublicCategories({
  limit,
  page,
}: GetPublicCategoriesProps): Promise<CategoryListRes> {
  const publicCategories = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/public/category?limit=${limit}&page=${page}$`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
      },
      cache: "no-store",
    }
  )
  return await publicCategories.json()
}

export default async function AllPublicCategories() {
  const publicCategoryResp = await getPublicCategories({
    limit: 1000,
    page: 1,
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
            title: "Semua Kategori",
            href: `/intro/categories/all`,
          },
        ]}
      />

      <CategoryWrapper publicCategoryResp={publicCategoryResp} />
    </Shell>
  )
}
