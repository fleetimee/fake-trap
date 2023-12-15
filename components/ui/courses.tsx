"use client"

import * as React from "react"
import { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronDownIcon } from "@radix-ui/react-icons"

import { UserEnrolledCourseListResData } from "@/types/me/res"
import { sortOptions } from "@/config/coruses"
import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import CourseCardV2 from "@/components/course-card"
import { PaginationButton } from "@/components/pagers/pagination-button"

import { Button } from "./button"
import { CardDescription } from "./card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Input } from "./input"
import { Label } from "./label"
import { Separator } from "./separator"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet"

interface CoursesProps {
  courses: UserEnrolledCourseListResData[]
  pageCount: number
}

export function Courses({ courses, pageCount }: CoursesProps) {
  const id = React.useId()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "created_at.desc"
  const [query, setQuery] = React.useState("")

  const search = searchParams?.get("search") ?? ""
  const debouncedQuery = useDebounce(query, 500)

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
    <section className="flex flex-col gap-6 space-y-2">
      <div className="  flex items-center space-x-2">
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

      <div className="grid grid-cols-1 gap-6  xl:grid-cols-2">
        {courses.map((course) => (
          <CourseCardV2
            key={course.id_course}
            courseId={course.id_course.toString()}
            courseAuthor={course.tutor_name}
            courseDate={new Date(course.created_at).toLocaleDateString()}
            courseDescription={course.course_desc}
            courseImage={course.image}
            courseTitle={course.course_name}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <PaginationButton
          pageCount={pageCount}
          page={page}
          sort={sort}
          search={search}
          per_page={per_page}
          createQueryString={createQueryString}
        />
      </div>
    </section>
  )
}
