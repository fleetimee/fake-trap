"use client"

import React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Variants } from "framer-motion"

import { KnowledgeListResData } from "@/types/knowledge/res"
import { sortOptions } from "@/config/knowledges"
import { cn } from "@/lib/utils"
import { KnowledgeCard } from "@/components/app/public-knowledge/ui"
import { HeaderIntro } from "@/components/category-header"
import { MotionDiv } from "@/components/framer-wrapper"
import { PaginationButton } from "@/components/pagers/pagination-button"
import { KnowledgeCardSkeleton } from "@/components/skeletons/knowledge-card-skeleton"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"

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

interface GetPublicKnowledgeProps {
  knowledges: KnowledgeListResData[]
  pageCount: number
}

export function KnowledgeWrapper({
  knowledges,
  pageCount,
}: GetPublicKnowledgeProps) {
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

      <div className="flex items-center space-x-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" size="sm" disabled={isPending}>
              Filter
            </Button>
          </SheetTrigger>
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

      <MotionDiv
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={parentVariant}
        initial="initial"
        animate="animate"
      >
        {/* {!publicKnowledgeResp.data
          ? null
          : publicKnowledgeResp.data.map((knowledge) => (
              <MotionDiv
                variants={childrenVariant}
                className="child"
                whileHover={{
                  scale: 1.05,
                }}
              >
                <KnowledgeCard
                  key={knowledge.id_knowledge}
                  knowledge={knowledge}
                  link={`/intro/knowledge/${knowledge.id_knowledge}`}
                />
              </MotionDiv>
            ))} */}

        <React.Suspense
          fallback={Array.from({ length: 10 }).map((_, i) => (
            <KnowledgeCardSkeleton key={i} />
          ))}
        >
          {knowledges?.map((knowledge) => (
            <MotionDiv
              variants={childrenVariant}
              className="child"
              whileHover={{
                scale: 1.05,
              }}
            >
              <KnowledgeCard
                key={knowledge.id_knowledge}
                knowledge={knowledge}
                link={`/intro/knowledge/${knowledge.id_knowledge}`}
              />
            </MotionDiv>
          ))}
        </React.Suspense>
      </MotionDiv>

      {knowledges.length ? (
        <PaginationButton
          pageCount={pageCount}
          page={page}
          sort={sort}
          per_page={per_page}
          createQueryString={createQueryString}
        />
      ) : null}
    </>
  )
}
