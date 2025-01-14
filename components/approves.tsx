"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Cross2Icon } from "@radix-ui/react-icons"
import { ChevronDownIcon } from "lucide-react"

import { AprovalRequestListData } from "@/types/approval/res"
import {
  approvalKnowledgeOptions,
  approvalOptions,
  approvalStatusOptions,
} from "@/config/approval"
import { cn, convertDatetoString } from "@/lib/utils"
import { PengajuanCard } from "@/components/cards/pengajuan-card"
import { DateRangePicker } from "@/components/date-range-picker"
import { FacetedFilter } from "@/components/faceted-filter"
import { PaginationButton } from "@/components/pagers/pagination-button"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ApprovesProps {
  approvals: AprovalRequestListData[]
  pageCount: number
}

export function Approves({ approvals, pageCount }: ApprovesProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [approverOptions, setApproverOptions] = React.useState<
    { label: string; value: string }[]
  >([])

  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"

  const statuses = searchParams?.get("statuses")

  const approverId = searchParams?.get("approverId")

  const per_page = searchParams?.get("per_page") ?? "6"

  // Make a array of approver name and approver uuid
  // and then make it into a object
  React.useEffect(() => {
    const uniqueApproverOptions = approvals.reduce<
      { label: string; value: string }[]
    >((unique, approval) => {
      if (!unique.find((item) => item.value === approval.approver_id)) {
        unique.push({
          label: approval.approver_name,
          value: approval.approver_id,
        })
      }
      return unique
    }, [])

    setApproverOptions(uniqueApproverOptions)
  }, [approvals])

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

  const [filterValues, setFilterValues] = React.useState<string[]>(
    statuses ? statuses?.split(".") : []
  )

  const [approverValues, setApproverValues] = React.useState<string[]>(
    approverId ? approverId?.split(".") : []
  )

  React.useEffect(() => {
    startTransition(() => {
      const newQueryString = createQueryString({
        statuses: filterValues?.length ? filterValues.join(".") : null,
      })

      router.push(`${pathname}?${newQueryString}`, {
        scroll: false,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues])

  React.useEffect(() => {
    startTransition(() => {
      const newQueryString = createQueryString({
        approverId: approverValues?.length ? approverValues.join(".") : null,
      })

      router.push(`${pathname}?${newQueryString}`, {
        scroll: false,
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approverValues])

  return (
    <section className="flex flex-col gap-6 space-y-6">
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort stores" size="sm" disabled={isPending}>
              Sort
              <ChevronDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {approvalKnowledgeOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(option.value === sort && "font-bold")}
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

        <div className="flex flex-1 items-center space-x-2">
          <FacetedFilter
            title="Status"
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            options={approvalStatusOptions}
          />

          <FacetedFilter
            title="Approver"
            filterValues={approverValues}
            setFilterValues={setApproverValues}
            options={approverOptions}
          />

          {filterValues.length ||
            (approverValues.length > 0 && (
              <Button
                aria-label="Reset filters"
                variant="ghost"
                className="h-8 px-2 lg:px-3"
                onClick={() => {
                  setFilterValues([])
                  setApproverValues([])
                }}
              >
                Reset
                <Cross2Icon className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            ))}
        </div>

        <DateRangePicker />
      </div>

      <div className="flex flex-col space-y-4">
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
