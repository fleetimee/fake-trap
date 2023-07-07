"use client"

import { ColumnDef } from "@tanstack/react-table"

import { QuizData } from "@/types/quiz-res"

export const columns: ColumnDef<QuizData>[] = [
  {
    accessorKey: "id_quiz",
    header: "ID Quiz",
  },
  {
    accessorKey: "quiz_title",
    header: "Nama Quiz",
  },
  {
    accessorKey: "quiz_desc",
    header: "Deskripsi Quiz",
  },
  {
    accessorKey: "quiz_type",
    header: "Tipe Quiz",
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
  },
  {
    id: "actions",
    header: "Pertanyaan Quiz?",
  },
]
