"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { CategoryListResData } from "@/types/category/res"
import { sortOptions } from "@/config/categories"
import { cn } from "@/lib/utils"

import { CategoryCard } from "./category-card"
import { PaginationButton } from "./pagers/pagination-button"
import { CategoryCardSkeleton } from "./skeletons/category-card-skeleton"
import { Button } from "./ui/button"
import { CardDescription } from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
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
                {/* <Input
                    placeholder="Search something..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value)
                    }}
                  /> */}
              </div>
            </div>
            <div>
              <Separator className="my-4" />
              <SheetFooter>
                {/* <Button
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
                  </Button> */}
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
          sort={sort}
          per_page={per_page}
          createQueryString={createQueryString}
        />
      ) : null}
    </section>
  )
}
