"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { ThreadListResData } from "@/types/threads/res"

import { ForumCard } from "./forum-card"
import { PaginationButton } from "./pagers/pagination-button"

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
  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"

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

  return (
    <div className="flex flex-col gap-4">
      {data.map((thread) => (
        <ForumCard
          idCourse={idCourse}
          idThreads={thread.id_threads.toString()}
          title={thread.threads_title}
          createdAt={thread.created_at.toString()}
          numberOfPosts={thread.number_of_posts}
          numberOfUsers={thread.number_of_users}
          linkString={`/peserta/course/detail/${idCourse}/threads/${thread.id_threads}`}
        />
      ))}
      {data.length ? (
        <PaginationButton
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          createQueryString={createQueryString}
        />
      ) : null}
    </div>
  )
}
