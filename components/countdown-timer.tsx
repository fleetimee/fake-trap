"use client"

import React, { useEffect, useState } from "react"

interface CountdownTimerProps {
  endDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ endDate }: CountdownTimerProps) {
  function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(endDate) - +new Date() // Correctly uses endDate as a string for Date constructor
    let timeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate]) // This remains to ensure the countdown is recalculated if endDate changes

  function formatTime(time: number): string {
    return time < 10 ? `0${time}` : time.toString()
  }

  const isTimeUp =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0

  if (isTimeUp) {
    return (
      <div className="flex items-center rounded-lg border border-red-400/20 bg-red-500/10 p-2 shadow-lg backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
          <span className="text-sm font-semibold tracking-wider text-red-500">
            WAKTU HABIS
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-1 rounded-lg border border-black/10 bg-white/30 p-2 shadow-lg backdrop-blur-md">
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/80 text-base font-bold text-black shadow-inner">
            {formatTime(timeLeft.days)}
          </div>
          <span className="mt-0.5 text-[9px] font-bold tracking-wider text-black">
            HARI
          </span>
        </div>
        <span className="mx-0.5 text-sm font-medium text-black/60">:</span>
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/80 text-base font-bold text-black shadow-inner">
            {formatTime(timeLeft.hours)}
          </div>
          <span className="mt-0.5 text-[9px] font-bold tracking-wider text-black">
            JAM
          </span>
        </div>
        <span className="mx-0.5 text-sm font-medium text-black/60">:</span>
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/80 text-base font-bold text-black shadow-inner">
            {formatTime(timeLeft.minutes)}
          </div>
          <span className="mt-0.5 text-[9px] font-bold tracking-wider text-black">
            MNT
          </span>
        </div>
        <span className="mx-0.5 text-sm font-medium text-black/60">:</span>
        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/80 text-base font-bold text-black shadow-inner">
            {formatTime(timeLeft.seconds)}
          </div>
          <span className="mt-0.5 text-[9px] font-bold tracking-wider text-black">
            DTK
          </span>
        </div>
      </div>
    </div>
  )
}
