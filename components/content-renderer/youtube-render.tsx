import React from "react"

import { getYoutubeLastId } from "@/lib/utils"
import { YoutubePlayer } from "@/components/youtube-player"

interface YoutubeRenderProps {
  link: string | undefined
}

export function YoutubeRender({ link }: YoutubeRenderProps) {
  return <YoutubePlayer videoId={getYoutubeLastId(link)} />
}
