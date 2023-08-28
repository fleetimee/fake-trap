"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { type ColumnDef } from "@tanstack/react-table"

import { CategoryListRes, CategoryListResData } from "@/types/category/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { QuizListResData } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { convertDatetoString } from "@/lib/utils"
import { KnowledgeOperations } from "@/components/app/knowledge/operations"
import { DataTable, DataTableColumnHeader } from "@/components/data-table"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

interface QuizTableShellProps {
  data: KnowledgeListResData[]
  pageCount: number
}

export function QuizTableShell({ data, pageCount }: QuizTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
}
