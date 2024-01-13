"use client"

import React from "react"
import ReactPlayer from "react-player"

interface LocalVideoPlayerProps {
  url: string
}

export function LocalVideoPlayer({ url }: LocalVideoPlayerProps) {
  return (
    <div>
      <div style={{ position: "relative" }}>
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          playing={true}
          controls={true}
          muted={true}
          loop={true}
        />
        {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        /> */}
      </div>
    </div>
  )
}
