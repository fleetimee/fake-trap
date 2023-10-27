"use client"

import Youtube, { YouTubeProps } from "react-youtube"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card } from "@/components/ui/card"

export function YoutubePlayer({ videoId }: YouTubeProps) {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    // playerVars: {
    //   // https://developers.google.com/youtube/player_parameters
    //   autoplay: 1,
    //   mute: 1,
    // },
  }

  return (
    <AspectRatio ratio={16 / 9}>
      <Card className="h-full min-h-full w-full ">
        <Youtube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          className="aspect-video h-full w-full rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
        />
      </Card>
    </AspectRatio>
  )
}
