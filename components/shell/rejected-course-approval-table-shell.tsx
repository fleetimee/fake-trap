"use client"

import React from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { ApprovalListResData } from "@/types/approval/res/approval-list"
import { convertDatetoStringShort } from "@/lib/utils"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Checkbox } from "@/components/ui/checkbox"
import RejectedAction from "@/app/(dashboard-supervisor)/supervisor-area/approval/approve-course/(main-layout)/rejected/_components/operations"

import { Badge } from "../ui/badge"


interface RejectedCourseApprovalTableShellProps {
  data: ApprovalListResData[]
  pageCount: number
}

export function RejectedCourseApprovalTableShell({
  data,
  pageCount,
}: RejectedCourseApprovalTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])

  const columns = React.useMemo<ColumnDef<ApprovalListResData, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length
                  ? []
                  : data.map((row) => row.id_approval_course)
              )
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                value
                  ? [...prev, row.original.id_approval_course]
                  : prev.filter((id) => id !== row.original.id_approval_course)
              )
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "course_name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama Pelatihan" />
        ),
        cell: ({ row }) => {
          return (
            <Link
              href={`/supervisor-area/approval/approve-course/preview-course/${row.original.id_course}`}
              className="font-semibold text-primary hover:underline"
            >
              {row.original.course_name}
            </Link>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: "user_request",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Pembuat Materi" />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tanggal Buat" />
        ),
        cell: ({ row }) => {
          return (
            <p>
              {convertDatetoStringShort(row.original.created_at.toString())}
            </p>
          )
        },
      },
      {
        accessorKey: "status_text",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <Badge className="bg-red-500">{row.original.status_text}</Badge>
          )
        },
      },
      {
        id: "action",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Aksi" />
        ),
        enablesorting: false,
        cell: ({ row }) => {
          return (
            <RejectedAction id={row.original.id_approval_course.toString()} />
          )
        },
      },
    ],
    [data]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      searchableColumns={[
        {
          id: "course_name",
          title: "Nama Pelatihan",
        },
      ]}
    />
  )
}
