"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { DataTableFilterableColumn, DataTableSearchableColumn } from "@/types"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"

import { ApprovalSupervisorPemateriListResData } from "@/types/approval/res"
import { badgeSwitch } from "@/lib/badge-switch"
import { convertDatetoString } from "@/lib/utils"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface KnowledgeSupervisorPemateriTableShellProps {
  data: ApprovalSupervisorPemateriListResData[]
  pageCount: number
}

export function ApprovalKnowledgeSupervisorPemateriTableShell({
  data,
  pageCount,
}: KnowledgeSupervisorPemateriTableShellProps) {
  const pathname = usePathname()

  const columns = React.useMemo<
    ColumnDef<ApprovalSupervisorPemateriListResData, unknown>[]
  >(
    () => [
      {
        id: "action",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="#" />
        ),
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                // disabled={isStatusCodeIn(["0051", "0052", "0053"])}
                >
                  <Link
                    href={`${pathname}/detail/${row.original.id_approval}/knowledge/${row.original.id_knowledge}`}
                    rel="noreferrer"
                    className="flex w-full cursor-default items-center"
                  >
                    Preview
                    <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  // disabled={isStatusCodeIn(["", "0051", "0052"])}
                  onSelect={() => {
                    // router.push(
                    //   `/dashboard/knowledge/revision-form/${knowledgeData.id_knowledge}`
                    // )
                  }}
                >
                  <Link
                    href={`${pathname}/confirmation/${row.original.id_approval}`}
                    rel="noreferrer"
                    className="flex w-full cursor-default items-center"
                  >
                    Konfirmasi <DropdownMenuShortcut>⇧⌘R</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
      {
        accessorKey: "knowledge_title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Judul Pengetahuan" />
        ),
        cell: ({ row }) => (
          <div className="w-[250px]">
            <Link
              href={`${pathname}/detail/${row.original.id_approval}/knowledge/${row.original.id_knowledge}`}
              passHref
              className="font-semibold text-blue-500 hover:underline"
            >
              {row.original.knowledge_title}
            </Link>
          </div>
        ),
      },
      {
        accessorKey: "status_text",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) =>
          badgeSwitch({
            approval: {
              status_code: row.original.status,
              status_text: row.original.status_text,
            },
          }),
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tanggal Pengajuan" />
        ),
        cell: ({ row }) => (
          <div className="w-[200px]">
            {convertDatetoString(row.original.created_at.toString())}
          </div>
        ),
      },
      {
        accessorKey: "updated_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tanggal Update" />
        ),
        cell: ({ row }) => (
          <div className="w-[200px]">
            {convertDatetoString(row.original.updated_at.toString())}
          </div>
        ),
      },
      {
        accessorKey: "requester_name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama Pengaju" />
        ),
        cell: ({ row }) => (
          <span className="w-[200px]">{row.original.requester_name}</span>
        ),
      },
      {
        accessorKey: "approved_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tanggal Approve" />
        ),
        cell: ({ row }) => {
          return (
            <span>
              {row.original.approved_at.toString() !== "0001-01-01T00:00:00Z"
                ? convertDatetoString(row.original.approved_at.toString())
                : "-"}
            </span>
          )
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const searchableColumns: DataTableSearchableColumn<ApprovalSupervisorPemateriListResData>[] =
    [
      {
        id: "knowledge_title",
        title: "Judul",
      },
    ]

  const filterableColumns: DataTableFilterableColumn<ApprovalSupervisorPemateriListResData>[] =
    [
      {
        id: "status_text",
        title: "Status",
        options: [
          {
            label: "PENDING",
            value: "0051",
          },
          {
            label: "APPROVED",
            value: "0052",
          },
          {
            label: "REJECTED",
            value: "0053",
          },
        ],
      },
    ]

  const { dataTable } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  })

  return (
    <DataTable
      dataTable={dataTable}
      columns={columns}
      searchableColumns={searchableColumns}
      filterableColumns={filterableColumns}
    />
  )
}
