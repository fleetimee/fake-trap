"use client"

import { ClockIcon } from "lucide-react"
import { useMediaQuery } from "react-responsive"
import Balancer from "react-wrap-balancer"

import { ContentOneRes } from "@/types/content/res"
import { convertDatetoString } from "@/lib/utils"
import { LocalVideoPlayer } from "@/components/local-video-player"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"

interface LocalVideoFrameProps {
  content: ContentOneRes
}

export function LocalVideoFrame({ content }: LocalVideoFrameProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" })

  return (
    <div className={`flex flex-col items-start justify-center gap-3 `}>
      {
        // Desktop

        !isMobile && (
          <>
            <h1 className="text-4xl font-bold  ">
              <Balancer>{content.data.content_title}</Balancer>
            </h1>

            <span className="inline-flex">
              <ClockIcon className="mr-2 size-6 text-gray-500" />
              <p>{convertDatetoString(content.data.created_at.toString())}</p>
            </span>

            <Separator />

            <p className="py-2 text-sm italic">
              {content.data.video_upload?.flavor_text}
            </p>
          </>
        )
      }

      {
        // Mobile
        isMobile && (
          <AspectRatio ratio={16 / 9}>
            <LocalVideoPlayer
              url={`${process.env.NEXT_PUBLIC_BASE_URL}${content.data.video_upload?.video_path}`}
            />
          </AspectRatio>
        )
      }
    </div>
  )
}
