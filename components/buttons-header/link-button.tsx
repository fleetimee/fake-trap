import React from "react"
import Link from "next/link"

import { BookmarkButton } from "@/components/buttons-header"
import { Icons } from "@/components/icons"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"





interface LinkButtonProps {
  link: string
}

export function LinkButton({ link }: LinkButtonProps) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Icons.outsideLink className="h-14 w-14 flex-none  pl-5" />
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-full">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Buka Link</h4>
              <p className="text-sm">Buka link ini di tab baru</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <BookmarkButton />
    </>
  )
}
