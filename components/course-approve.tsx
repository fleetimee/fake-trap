"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Cross2Icon } from "@radix-ui/react-icons"
import { ChevronDownIcon } from "lucide-react"

import { ApprovalOperatorLMSListResData } from "@/types/approval/res"
import { approvalOptions, approvalStatusOptions } from "@/config/approval"
import { cn, convertDatetoString } from "@/lib/utils"
import { PengajuanCard } from "@/components/cards/pengajuan-card"
import { PaginationButton } from "@/components/pagers/pagination-button"

import { FacetedFilter } from "./faceted-filter"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface ApprovesProps {
  approvals: ApprovalOperatorLMSListResData[]
  pageCount: number
}

export function CourseApproves({ approvals, pageCount }: ApprovesProps) {
  const id = React.useId()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  const statuses = searchParams?.get("statuses")

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"

  const per_page = searchParams?.get("per_page") ?? "6"

  // Make a array of approver name and approver uuid
  // and then make it into a object
  const approverOptions = React.useMemo(() => {
    const approverOptions = approvals.reduce<
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
    return approverOptions
  }, [approvals])

  console.log(approverOptions)

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
            {approvalOptions.map((option) => (
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
          {filterValues.length > 0 && (
            <Button
              aria-label="Reset filters"
              variant="ghost"
              className="h-8 px-2 lg:px-3"
              onClick={() => setFilterValues([])}
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>

      <div className="mx-auto grid grid-cols-1 items-center justify-between gap-8 xl:grid-cols-3">
        {approvals?.map((request) => (
          <PengajuanCard
            key={request.id_approval}
            approverName={request.approver_name}
            approverHandle={request.approver_id}
            date={convertDatetoString(request.created_at.toString())}
            status={request.status_text}
            statusCode={request.status}
            sender={request.requester_name}
            knowledgeTitle={request.course_name}
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
