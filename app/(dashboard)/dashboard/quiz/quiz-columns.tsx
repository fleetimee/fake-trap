"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"

import { QuizData } from "@/types/quiz-res"
import { convertDatetoString } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { QuizOperations } from "@/components/app/quiz/quiz-operations"

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
    cell: ({ row }) => {
      const quiz = row.original

      return (
        <>
          <Link
            href={`/dashboard/quiz/${quiz.id_quiz}`}
            className="text-blue-500"
          >
            <span className="font-semibold">{quiz.quiz_title}</span>
          </Link>
        </>
      )
    },
  },
  {
    accessorKey: "quiz_desc",
    header: "Deskripsi",
  },
  {
    accessorKey: "quiz_type",
    header: "Tipe",
    cell: ({ row }) => {
      const quiz = row.original

      return (
        <>
          {quiz.quiz_type === 1
            ? "Quiz"
            : quiz.quiz_type === 2
            ? "Exam"
            : "Assignment"}
        </>
      )
    },
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
    header: "Aksi",
    cell: ({ row }) => {
      const quiz = row.original

      return <QuizOperations quiz={quiz} />
    },
  },
]
