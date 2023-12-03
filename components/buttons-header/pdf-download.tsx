import React from "react"
import Link from "next/link"

import { BookmarkButton } from "@/components/buttons-header"
import { Icons } from "@/components/icons"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"





interface PdfDownloadButtonProps {
  link: string
}

export function PdfDownloadButton({ link }: PdfDownloadButtonProps) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Icons.save className="h-14 w-14 flex-none  pl-5" />
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-full">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Unduh / Simpan PDF</h4>
              <p className="text-sm">
                Unduh atau simpan PDF untuk dibaca nanti.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <BookmarkButton />
    </>
  )
}
