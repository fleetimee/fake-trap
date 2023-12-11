"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ColumnDef } from "@tanstack/react-table"

import {
  ApprovalSupervisorPemateriListRes,
  ApprovalSupervisorPemateriListResData,
} from "@/types/approval/res"
import { CategoryListRes } from "@/types/category/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { ReferenceListRes } from "@/types/references/res"
import { convertDatetoString, convertDatetoStringShort } from "@/lib/utils"
import { KnowledgeOperations } from "@/components/app/knowledge/operations"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"

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
      },
      {
        accessorKey: "knowledge_title",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Judul Pengetahuan" />
        ),
        cell: ({ row }) => (
          <div className="w-[250px]">{row.original.knowledge_title}</div>
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
