"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { CourseKnowledgeListResData } from "@/types/course/res"
import { useDebounce } from "@/hooks/use-debounce"
import { KnowledgeCard } from "@/components/cards/knowledge-card"
import { Icons } from "@/components/icons"
import { PaginationButton } from "@/components/pagers/pagination-button"
import { KnowledgeCardSkeleton } from "@/components/skeletons/knowledge-card-skeleton"

interface CourseKnowledgesProps {
  courseKnowledges: CourseKnowledgeListResData[]
  pageCount: number
  link?: string
}

export function CoursesKnowledges({
  courseKnowledges,
  pageCount,
  link,
}: CourseKnowledgesProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 500)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "created_at.desc"

  const search = searchParams?.get("search") ?? ""

  const per_page = searchParams?.get("per_page") ?? "6"

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
    <div className="flex flex-col justify-between space-y-8">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <React.Suspense
          fallback={Array.from({ length: 10 }).map((_, i) => (
            <KnowledgeCardSkeleton key={i} />
          ))}
        >
          {courseKnowledges?.length > 0 ? (
            courseKnowledges.map((knowledge) => (
              <KnowledgeCard
                key={knowledge.id_knowledge}
                knowledge={knowledge}
                link={link ? `${link}/${knowledge.id_knowledge}` : `#`}
              />
            ))
          ) : (
            <div className="col-span-3 flex min-h-[300px] flex-col justify-center gap-4 space-y-12">
              <p className="col-span-3 line-clamp-2 items-center  justify-center text-center text-2xl font-semibold uppercase leading-tight">
                Belum ada materi pada pembelajaran ini
              </p>

              <div className="mx-auto flex h-44 w-44 flex-col items-center justify-center rounded-full bg-yellow-300 p-7">
                <Icons.warning className="mx-auto h-32 w-32 text-yellow-500 " />
              </div>
            </div>
          )}
        </React.Suspense>
      </div>

      {courseKnowledges.length ? (
        <PaginationButton
          pageCount={pageCount}
          page={page}
          sort={sort}
          search={search}
          per_page={per_page}
          createQueryString={createQueryString}
        />
      ) : null}
    </div>
  )
}
