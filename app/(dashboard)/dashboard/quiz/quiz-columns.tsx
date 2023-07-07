"use client"

import { ColumnDef } from "@tanstack/react-table"

import { QuizData } from "@/types/quiz-res"
import { convertDatetoString } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<QuizData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id_quiz",
    header: "ID",
  },
  {
    accessorKey: "quiz_title",
    header: "Judul",
  },
  {
    accessorKey: "quiz_desc",
    header: "Deskripsi",
  },
  {
    accessorKey: "quiz_type",
    header: "Tipe",
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ row }) => {
      convertDatetoString(row.original.created_at.toString())

      return <>{convertDatetoString(row.original.created_at.toString())}</>
    },
  },
  {
    id: "actions",
    header: "Ready?",
  },
]
