"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import ReactPlayer from "react-player"
import { toast as sonnerToast } from "sonner"

interface LocalVideoPlayerProps {
  url: string
  thumbnail?: string
  idContent?: string
}

export function LocalVideoPlayer({
  url,
  thumbnail,
  idContent,
}: LocalVideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [timestamp, setTimestamp] = useState(240)
  const [isReady, setIsReady] = useState(false)

  const [played, setPlayed] = useState(0)
  const [light, setLight] = useState("/images/maxresdefault.jpg")
  const [showButton, setShowButton] = useState(true)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  )
  const [playedSeconds, setPlayedSeconds] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)

  let mouseLeaveTimeout: NodeJS.Timeout | undefined

  const playerRef = useRef<ReactPlayer>(null)

  const handlePlayPause = () => {
    setPlaying(!playing)
    if (light) {
      setLight("")
    }
  }

  const handleRewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playedSeconds - 10, "seconds")
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value))
  }

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat((e.target as HTMLInputElement).value))
    }
  }

  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveTimeout)
    setShowButton(true)
  }

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
        setIsFullscreen(false)
      } else {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    }
  }

  const handleMouseLeave = () => {
    mouseLeaveTimeout = setTimeout(() => {
      setShowButton(false)
    }, 2000) // Hide button after 2 seconds
  }

  // Fetch timestamp data from server
  // useEffect(() => {
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/public/users/fa357ffc-3ea2-47a5-8867-e510e72bcf62/videoContent/176`
  //   ).then(async (res) => {
  //     const response = await res.json()

  //     console.log("Response:", response) // Log the fetched response

  //     console.log("Player ref:", playerRef.current) // Log the player ref

  //     // Check if timestamp is a valid number
  //     if (
  //       typeof response.data.timestamp === "number" &&
  //       isFinite(response.data.timestamp)
  //     ) {
  //       console.log("Timestamp is a valid number:", response.data.timestamp)

  //       // Seek to second timestamp
  //       setTimestamp(response.data.timestamp)
  //     } else {
  //       console.log("Timestamp is not a valid number:", response.data.timestamp)
  //     }
  //   })
  // }, [])

  const handleReady = () => {
    if (playerRef.current && timestamp !== null) {
      playerRef.current.seekTo(timestamp, "seconds")
      setIsReady(true)
    }
  }

  const handleStart = () => {
    if (playerRef.current && isReady) {
      playerRef.current.getInternalPlayer().play()
    }
  }

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(mouseLeaveTimeout)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(
  //       typeof window !== "undefined" ? window.innerWidth < 768 : false
  //     )
  //   }

  //   window.addEventListener("resize", handleResize)
  //   return () => {
  //     window.removeEventListener("resize", handleResize)
  //   }
  // }, [])

  return (
    <div
      ref={containerRef}
      className="relative pt-[56.25%] transition-all"
      onMouseEnter={
        isMobile
          ? undefined
          : () => {
              handleMouseEnter()
            }
      }
      onMouseLeave={
        isMobile
          ? undefined
          : () => {
              handleMouseLeave()
            }
      }
    >
      <ReactPlayer
        ref={playerRef}
        pip={true}
        url={url}
        // light={light}
        // onReady={handleReady}
        // onStart={handleStart}
        playing
        controls
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        loop={true}
        config={{
          file: {
            attributes: {
              onContextMenu: (e: { preventDefault: () => any }) => {
                e.preventDefault()
                sonnerToast.error("Error", {
                  description: "Klik kanan tidak tersedia",
                })
              },

              controlsList: "nodownload",
            },
          },
        }}
      />

      <div className="absolute left-4 top-4 p-1 text-xs text-white xl:text-xl">
        <Image
          alt="Logo"
          className="ml-2 inline-block"
          height={150}
          src="/logo_tv.png"
          width={150}
        />
      </div>

      {/* {showButton && (
        <div className="absolute inset-x-4 bottom-4 rounded-md bg-black p-2 opacity-80">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="flex space-x-4">
              <Button
                className="rounded-full p-2 shadow-md"
                onClick={handleRewind}
              >
                <Rewind className="h-6 w-6" />
              </Button>
              <Button
                className="rounded-full p-2 shadow-md"
                onClick={handlePlayPause}
              >
                {playing ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
            </div>

            <div className="mt-2 flex flex-col items-center space-x-0 sm:mt-0 sm:flex-row sm:space-x-4">
              <div className="text-white">
                {format(playedSeconds * 1000, "mm:ss")} /{" "}
                {format(duration * 1000, "mm:ss")}
              </div>

              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={volume}
                onChange={handleVolumeChange}
                className="mt-2 h-2 w-20 rounded-full bg-white sm:mt-0"
              />
              <Button
                className="mt-2 rounded-full p-2 shadow-md sm:mt-0"
                onClick={handleFullscreen}
              >
                {isFullscreen ? (
                  <ExitFullScreenIcon className="h-6 w-6" />
                ) : (
                  <EnterFullScreenIcon className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseUp={handleSeekMouseUp}
            onChange={handleSeekChange}
            className="mt-2 h-2 w-full rounded-full bg-white"
          />
        </div>
      )} */}
    </div>
  )
}
