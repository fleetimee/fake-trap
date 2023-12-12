"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { type ColumnDef } from "@tanstack/react-table"

import {
  ApprovalSupervisorCourseListResData,
  ApprovalSupervisorPemateriListResData,
} from "@/types/approval/res"
import { convertDatetoString } from "@/lib/utils"
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

interface BadgeSwitchProps {
  approval: any
}

function badgeSwitch({ approval }: BadgeSwitchProps) {
  switch (approval.status) {
    case "0052":
      return <Badge className="bg-green-400">{approval.status_text}</Badge>
    case "0051":
      return <Badge className="bg-yellow-400">{approval.status_text}</Badge>
    case "0053":
      return <Badge className="bg-red-400">{approval.status_text}</Badge>
    default:
      return <Badge className="bg-orange-400">Draft</Badge>
  }
}

interface SupervisorLmsApprovalPemateriTableProps {
  data: ApprovalSupervisorCourseListResData[]
  pageCount: number
}

export function ApprovalCourseSupervisorTableShell({
  data,
  pageCount,
}: SupervisorLmsApprovalPemateriTableProps) {
  const pathname = usePathname()

  const columns = React.useMemo<
    ColumnDef<ApprovalSupervisorCourseListResData>[]
  >(
    () => [
      {
        accessorKey: "course_name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Nama Pelatihan" />
        ),
        cell: ({ row }) => (
          <div className="w-[250px]">
            <Link
              href={`${pathname}/detail/${row.original.id_approval}/course/${row.original.id_course}`}
              passHref
              className="font-semibold text-blue-500 hover:underline"
            >
              {row.original.course_name}
            </Link>
          </div>
        ),
      },
      {
        accessorKey: "status_text",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => badgeSwitch({ approval: row.original }),
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
    []
  )

  return <DataTable columns={columns} data={data} pageCount={pageCount} />
}
