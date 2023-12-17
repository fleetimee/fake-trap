"use client"

import React from "react"
import Link from "next/link"
import { CursorTextIcon, FileIcon, VideoIcon } from "@radix-ui/react-icons"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface CreateContentDropdownButtonProps {
  videoCreationUrl: string
  fileCreationUrl: string
  articleCreationUrl: string
}

export function CreateContentDropdownButton({
  ...props
}: CreateContentDropdownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-end">
        <Button size="sm" variant="outline">
          <Icons.add className="h-4 w-4" />

          <span className="ml-2">Tambah Konten</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Tambah Konten</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href={props.videoCreationUrl}
            className="flex w-full items-center justify-start"
          >
            <VideoIcon className="h-4 w-4" />

            <span className="ml-2">Video</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={props.fileCreationUrl}
            className="flex w-full items-center justify-start"
          >
            <FileIcon className="h-4 w-4" />

            <span className="ml-2">File</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={props.articleCreationUrl}
            className="flex w-full items-center justify-start"
          >
            <CursorTextIcon className="h-4 w-4" />

            <span className="ml-2">Article</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
