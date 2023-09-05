import React from "react"
import Link from "next/link"

import { BookmarkButton } from "@/components/buttons-header"
import { Icons } from "@/components/icons"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

interface VideoDownloadButtonProps {
  link: string | undefined
}

export function VideoDownloadButton({ link }: VideoDownloadButtonProps) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger>
          <Link
            href={process.env.NEXT_PUBLIC_API_URL + "/api/ytdl/?link=" + link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.download className="h-14 w-14 flex-none  pl-5" />
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-full">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Unduh Video</h4>
              <p className="text-sm">Unduh video untuk ditonton nanti.</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <BookmarkButton />
    </>
  )
}
