"use client"

import Youtube, { YouTubeProps } from "react-youtube"

import { Card } from "./ui/card"

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
    <Card className="h-full w-full">
      <Youtube
        videoId={videoId}
        opts={opts}
        onReady={onPlayerReady}
        className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
      />
    </Card>
  )
}
