"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { KnowledgeListResData } from "@/types/knowledge/res"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui"
import { PaginationButton } from "@/components/pagers/pagination-button"
import { KnowledgeCardSkeleton } from "@/components/skeletons/knowledge-card-skeleton"

interface KnowledgesProps {
  knowledges: KnowledgeListResData[]
  pageCount: number
}

export function Knowledges({ knowledges, pageCount }: KnowledgesProps) {
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
    <section className="flex flex-col gap-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <React.Suspense
          fallback={Array.from({ length: 10 }).map((_, i) => (
            <KnowledgeCardSkeleton key={i} />
          ))}
        >
          {knowledges.map((knowledge) => (
            <KnowledgeCard
              key={knowledge.id_knowledge}
              knowledge={knowledge}
              link={`/peserta/knowledge/detail/${knowledge.id_knowledge}`}
            />
          ))}
        </React.Suspense>
      </div>
      {knowledges.length ? (
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
