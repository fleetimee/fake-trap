"use client"

import { YouTubeEmbed } from "@next/third-parties/google"
import Youtube, { YouTubeProps } from "react-youtube"

import { AspectRatio } from "@/components/ui/aspect-ratio"

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
      <div className="size-full min-h-full ">
        <Youtube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          className="aspect-video size-full rounded-lg object-cover shadow-md "
        />
      </div>
    </AspectRatio>
  )
}
