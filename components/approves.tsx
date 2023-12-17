"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { AprovalRequestListData } from "@/types/approval/res"
import { convertDatetoString } from "@/lib/utils"

import { PaginationButton } from "./pagers/pagination-button"
import { PengajuanCard } from "./pengajuan-card"

interface ApprovesProps {
  approvals: AprovalRequestListData[]
  pageCount: number
}

export function Approves({ approvals, pageCount }: ApprovesProps) {
  const id = React.useId()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"

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
    <section className="flex flex-col gap-6 space-y-6">
      <div className="mx-auto grid grid-cols-1 items-center justify-between gap-8 xl:grid-cols-2">
        {approvals?.map((request) => (
          <PengajuanCard
            key={request.id_approval}
            approverName={request.approver_name}
            approverHandle={request.approver_id}
            date={convertDatetoString(request.created_at.toString())}
            status={request.status_text}
            statusCode={request.status}
            sender={request.requester_name}
            knowledgeTitle={request.knowledge_title}
            baseeUrl={`${pathname}/revision/${request.id_approval}`}
          />
        ))}
      </div>
      {approvals.length ? (
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
