"use client"

import { ClockIcon } from "lucide-react"
import { useMediaQuery } from "react-responsive"

import { ContentOneRes } from "@/types/content/res"
import { convertDatetoString } from "@/lib/utils"
import { YoutubeRender } from "@/components/content-renderer"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"

interface YoutubeFrameProps {
  content: ContentOneRes
}

export function YoutubeFrame({ content }: YoutubeFrameProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" })

  return (
    <div className={`flex flex-col items-start justify-center gap-3 `}>
      {!isMobile && (
        <>
          <h1 className="text-4xl font-bold  ">{content.data.content_title}</h1>

          <span className="inline-flex">
            <ClockIcon className="mr-2 size-6 text-gray-500" />
            <p>{convertDatetoString(content.data.created_at.toString())}</p>
          </span>

          <Separator />

          <p className="py-2 text-sm italic ">
            {content.data.video?.flavor_text}
          </p>

          <YoutubeRender link={content.data.video?.video_url} />
        </>
      )}

      <AspectRatio ratio={16 / 9}>
        <YoutubeRender link={content.data.video?.video_url} />
      </AspectRatio>
    </div>
  )
}
