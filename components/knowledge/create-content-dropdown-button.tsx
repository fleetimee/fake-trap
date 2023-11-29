"use client"

import React from "react"
import Link from "next/link"
import { CursorTextIcon, FileIcon, VideoIcon } from "@radix-ui/react-icons"

import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
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

export default function CreateContentDropdownButton({
  ...props
}: CreateContentDropdownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center justify-end">
        <Link
          href="#"
          className={buttonVariants({
            size: "sm",
            variant: "default",
          })}
        >
          <Icons.add className="h-4 w-4" />
        </Link>
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
