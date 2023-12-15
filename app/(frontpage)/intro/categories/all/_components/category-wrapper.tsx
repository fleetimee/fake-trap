"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { set } from "date-fns"
import { Variants } from "framer-motion"
import { XIcon } from "lucide-react"

import { CategoryListResData } from "@/types/category/res"
import { sortOptions } from "@/config/categories"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { CategoryCard } from "@/components/category-card"
import { HeaderIntro } from "@/components/category-header"
import { MotionDiv } from "@/components/framer-wrapper"
import { PaginationButton } from "@/components/pagers/pagination-button"
import { CategoryCardSkeleton } from "@/components/skeletons/category-card-skeleton"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  const [query, setQuery] = useState("")
  const debouncedQuery = useDebounce(query, 500)

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "created_at.desc"

  const per_page = searchParams?.get("per_page") ?? "8"
  const search = searchParams?.get("search") ?? ""

  // Create query string
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
      const newSearchParams = {
        search: debouncedQuery,
        page: debouncedQuery !== search ? "1" : page,
        sort: sort,
      }

      router.push(`${pathname}?${createQueryString(newSearchParams)}`, {
        scroll: false,
      })
    })
  }, [createQueryString, debouncedQuery, page, pathname, router, search, sort])

  const isQueryModified =
    debouncedQuery !== "" || sort !== "created_at.desc" || page !== "1"

  return (
    <>
      <HeaderIntro
        title="Semua Pengetahuan"
        description="Temukan pengetahuan yang kamu butuhkan"
        size="sm"
      />

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
                  <Label>Cari Kategori</Label>
                  <CardDescription>
                    Cari kategori berdasarkan nama kategori
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
                          search: "",
                          page: "1",
                          sort: "created_at.desc",
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
        {
          // If it not the default query, show the reset button
          isQueryModified && (
            <Button
              aria-label="Reset filters"
              size="icon"
              variant="outline"
              className="flex items-center justify-center"
              onClick={() => {
                setQuery("")
                startTransition(() => {
                  router.push(
                    `${pathname}?${createQueryString({
                      search: "",
                      page: "1",
                      sort: "created_at.desc",
                    })}`,
                    {
                      scroll: false,
                    }
                  )
                })
              }}
              disabled={isPending}
            >
              <XIcon className=" h-4 w-4" aria-hidden="true" />
            </Button>
          )
        }
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <React.Suspense
          fallback={Array.from({ length: 8 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        >
          {categories &&
            categories.map((category) => (
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
      </div>

      {categories && categories.length ? (
        <PaginationButton
          pageCount={pageCount}
          page={page}
          sort={sort}
          per_page={per_page}
          search={search}
          createQueryString={createQueryString}
        />
      ) : null}
    </>
  )
}
