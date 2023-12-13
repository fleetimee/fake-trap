"use client"

import React, { useId } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Variants } from "framer-motion"

import { CategoryListRes, CategoryListResData } from "@/types/category/res"
import { CategoryCard } from "@/components/category-card"
import { HeaderIntro } from "@/components/category-header"
import { MotionDiv } from "@/components/framer-wrapper"
import { PaginationButton } from "@/components/pagers/pagination-button"
import { CategoryCardSkeleton } from "@/components/skeletons/category-card-skeleton"

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

interface GetPublicCategoriesProps {
  categories: CategoryListResData[]
  pageCount: number
}

export function CategoryWrapper({
  categories,
  pageCount,
}: GetPublicCategoriesProps) {
  const id = React.useId()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"

  const per_page = searchParams?.get("per_page") ?? "8"

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  return (
    <>
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
        {/* {publicCategoryResp.data.map((category) => (
          <MotionDiv
            variants={childrenVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={category.id_category}
            className="group relative overflow-hidden rounded-md border"
          >
            <CategoryCard
              category={category}
              link={`/intro/categories/${category.id_category}`}
            />
          </MotionDiv>
        ))} */}

        <React.Suspense
          fallback={Array.from({ length: 8 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        >
          {categories.map((category) => (
            <MotionDiv
              variants={childrenVariant}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={category.id_category}
              className="group relative overflow-hidden rounded-md border"
            >
              <CategoryCard
                category={category}
                link={`/intro/categories/${category.id_category}`}
              />
            </MotionDiv>
          ))}
        </React.Suspense>
      </MotionDiv>

      {categories.length ? (
        <PaginationButton
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          createQueryString={createQueryString}
        />
      ) : null}
    </>
  )
}
