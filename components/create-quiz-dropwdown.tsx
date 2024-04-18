"use client"

import React from "react"
import Link from "next/link"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CreateQuizDropdownButtonProps {
  quizCreationUrl: string
}

export function CreateQuizDropdownButton({
  quizCreationUrl,
}: CreateQuizDropdownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-end">
        <Link
          href={quizCreationUrl}
          className={buttonVariants({
            size: "sm",
            variant: "outline",
          })}
        >
          <Icons.add className="h-4 w-4" />

          <span className="ml-2">Tambah Ujian</span>
        </Link>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}
