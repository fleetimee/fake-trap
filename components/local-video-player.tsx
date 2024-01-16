"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { EnterFullScreenIcon, ExitFullScreenIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Pause, Play, Rewind } from "lucide-react"
import ReactPlayer from "react-player"
import { toast as sonnerToast } from "sonner"

import { Button } from "@/components/ui/button"

interface LocalVideoPlayerProps {
  url: string
  thumbnail?: string
}

export function LocalVideoPlayer({ url, thumbnail }: LocalVideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
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
        pip={true}
        url={url}
        light={light}
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

      <div className="absolute right-4 top-4 rounded-xl bg-black/50 p-2 text-xs text-white xl:text-xl">
        Hak Cipta &copy; {format(new Date(), "yyyy")}
        <Image
          alt="Logo"
          className="ml-2 inline-block"
          height={100}
          src="/images/logo.png"
          width={100}
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
