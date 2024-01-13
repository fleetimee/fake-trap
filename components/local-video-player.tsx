"use client"

import React from "react"
import ReactPlayer from "react-player"

interface LocalVideoPlayerProps {
  url: string
}

export function LocalVideoPlayer({ url }: LocalVideoPlayerProps) {
  return (
    <div>
      <div style={{ position: "relative" }} className="h-full w-full">
        <ReactPlayer
          pip={true}
          url={url}
          controls
          width="100%"
          height="100%"
          muted={true}
          loop={true}
          config={{
            file: {
              attributes: {
                onContextMenu: (e: { preventDefault: () => any }) =>
                  e.preventDefault(),
                controlsList: "nodownload",
              },
            },
          }}
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
