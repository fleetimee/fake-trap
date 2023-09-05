import React from "react"

import { Icons } from "@/components/icons"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function BookmarkButton() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Icons.bookmark className="h-14 w-14 flex-none  pl-5" />
      </HoverCardTrigger>
      <HoverCardContent className="w-full">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Bookmark Konten ini</h4>
            <p className="text-sm">
              Simpan konten ini agar mudah ditemukan nanti. (coming soon)
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
