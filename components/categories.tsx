"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { CategoryListResData } from "@/types/category/res"

import { CategoryCard } from "./category-card"
import { PaginationButton } from "./pagers/pagination-button"
import { CategoryCardSkeleton } from "./skeletons/category-card-skeleton"

interface CategoriesProps {
  categories: CategoryListResData[]
  pageCount: number
}

export function Categories({ categories, pageCount }: CategoriesProps) {
  const id = React.useId()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"

  const per_page = searchParams?.get("per_page") ?? "9"

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
    <section className="flex flex-col gap-6 space-y-6">
      <div className="xs:grid-cols-2 grid gap-4  lg:grid-cols-3">
        <React.Suspense
          fallback={Array.from({ length: 8 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        >
          {categories.map((category) => (
            <CategoryCard
              category={category}
              key={category.id_category}
              link={`/peserta/category/detail/${category.id_category}`}
            />
          ))}
        </React.Suspense>
      </div>
      {categories.length ? (
        <PaginationButton
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          createQueryString={createQueryString}
        />
      ) : null}
    </section>
  )
}
