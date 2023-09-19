import Image from "next/image"
import Link from "next/link"
import { Variants } from "framer-motion"

import { CategoryListRes } from "@/types/category/res"
import { cn } from "@/lib/utils"
import { PublicKnowledgeCard } from "@/components/app/public-knowledge/ui"
import { HeaderIntro } from "@/components/category-header"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { Shell } from "@/components/shell/lobby-shell"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { buttonVariants } from "@/components/ui/button"

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

const parentVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const childrenVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,

    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
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

      <MotionDiv
        initial={{
          opacity: 0,
          y: -100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <HeaderIntro
          title="Semua Pengetahuan"
          description="Temukan pengetahuan yang kamu butuhkan"
          size="sm"
        />
      </MotionDiv>

      <MotionDiv
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        {publicCategoryResp.data.map((category) => (
          <MotionDiv
            variants={childrenVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={category.id_category}
            className="group relative overflow-hidden rounded-md border"
          >
            <Link
              key={category.id_category}
              href={`/intro/categories/${category.id_category}`}
            >
              <AspectRatio ratio={16 / 9}>
                <div className="absolute inset-0 z-10 bg-zinc-950/70 transition-colors group-hover:bg-zinc-950/75" />
                <Image
                  src={category.image}
                  alt={category.category_name}
                  layout="fill"
                  objectFit="cover"
                  className="h-full rounded-t-md border-b"
                />
              </AspectRatio>
              <div className="absolute inset-4 z-20 flex flex-col">
                <div className="flex items-start justify-between space-x-4">
                  <div
                    className={cn(
                      buttonVariants({
                        size: "icon",
                        className:
                          "pointer-events-none h-8 w-8 bg-zinc-100 text-zinc-950",
                      })
                    )}
                    aria-hidden="true"
                  >
                    <Icons.category className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-zinc-200">1 items</p>
                </div>
                <h3 className="mt-auto text-xl font-medium capitalize text-zinc-200">
                  {category.category_name}
                </h3>
              </div>
              <span className="sr-only">{category.category_name}</span>
            </Link>
          </MotionDiv>
        ))}
      </MotionDiv>
    </Shell>
  )
}
