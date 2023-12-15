"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { KnowledgeListResData } from "@/types/knowledge/res"
import { sortOptions } from "@/config/knowledges"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui"
import { PaginationButton } from "@/components/pagers/pagination-button"
import { KnowledgeCardSkeleton } from "@/components/skeletons/knowledge-card-skeleton"

import { Button } from "./ui/button"
import { CardDescription } from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

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

  // Query Search
  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "created_at.desc"
  const search = searchParams?.get("search") ?? ""

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

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          search: debouncedQuery,
          page: page,
          sort: sort,
        })}`,
        {
          scroll: false,
        }
      )
    })
  }, [createQueryString, debouncedQuery, page, pathname, router, sort]) //

  return (
    <section className="flex flex-col gap-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" size="sm" disabled={isPending}>
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-[400px] flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex max-w-xl flex-1 flex-col gap-5 overflow-hidden p-1 ">
              <div className="flex flex-col items-start justify-between gap-5 rounded-lg border p-6 shadow-sm">
                <div className="space-y-0.5">
                  <Label>Cari Materi</Label>
                  <CardDescription>
                    Temukan materi yang kamu butuhkan
                  </CardDescription>
                </div>

                <Input
                  placeholder="Search something..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                />
              </div>
            </div>

            <div>
              <Separator className="my-4" />
              <SheetFooter>
                <Button
                  aria-label="Clear filters"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setQuery("")

                    startTransition(() => {
                      router.push(
                        `${pathname}?${createQueryString({
                          search: search,
                        })}`
                      ),
                        {
                          scroll: false,
                        }
                    })
                  }}
                  disabled={isPending}
                >
                  Clear Filters
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" size="sm" disabled={isPending}>
              Sort
              <ChevronDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(option.value === sort && "bg-accent font-bold")}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        sort: option.value,
                      })}`,
                      {
                        scroll: false,
                      }
                    )
                  })
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
          sort={sort}
          search={search}
          per_page={per_page}
          createQueryString={createQueryString}
        />
      ) : null}
    </section>
  )
}
