"use client"

import * as React from "react"
import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { ThreadListResData } from "@/types/threads/res"
import { sortOptions } from "@/config/threads"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"

import { ForumCard } from "./cards/forum-card"
import { PaginationButton } from "./pagers/pagination-button"
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

interface ThreadsProps {
  data: ThreadListResData[]
  pageCount: number
  idCourse: string
}

export function Threads({ data, pageCount, idCourse }: ThreadsProps) {
  const id = React.useId()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 500)
  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "created_at.desc"
  const search = searchParams?.get("search") ?? ""

  const per_page = searchParams?.get("per_page") ?? "10"

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

  return (
    <div className="flex flex-col gap-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Sheet>
          <SheetTrigger asChild disabled={!data}>
            <Button
              aria-label="Filter products"
              size="sm"
              disabled={isPending}
              variant="outline"
            >
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
                  <Label>Cari Threads</Label>
                  <CardDescription>Temukan threads</CardDescription>
                </div>

                <Input
                  placeholder="Search something..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                  }}
                  disabled={isPending}
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
                    // Reset the sort and page params
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
          <DropdownMenuContent align="start" className="w-60">
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

      {data === null ? (
        <div className="mt-9 flex flex-col items-center justify-center gap-4 py-8">
          <h1 className="text-2xl font-semibold">
            Belum ada thread / Filter tidak ditemukan
          </h1>
          <p className="text-sm text-muted-foreground">
            Buat thread baru untuk memulai diskusi / Coba filter lainnya
          </p>
        </div>
      ) : data?.length === 0 ? (
        <p>No threads found.</p>
      ) : (
        data.map((thread) => (
          <ForumCard
            idCourse={idCourse}
            idThreads={thread.id_threads.toString()}
            title={thread.threads_title}
            createdAt={thread.created_at.toString()}
            numberOfPosts={thread.number_of_posts}
            numberOfUsers={thread.number_of_users}
            linkString={`/peserta/course/detail/${idCourse}/threads/${thread.id_threads}`}
          />
        ))
      )}
      {data?.length ? (
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
