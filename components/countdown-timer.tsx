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

  return (
    <div className="flex items-center space-x-3 rounded-xl bg-blue-50/80 p-3 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">
          {formatTime(timeLeft.days)}
        </div>
        <span className="mt-1 text-xs font-medium text-blue-600">Hari</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500 text-xl font-bold text-white">
          {formatTime(timeLeft.hours)}
        </div>
        <span className="mt-1 text-xs font-medium text-blue-600">Jam</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-400 text-xl font-bold text-white">
          {formatTime(timeLeft.minutes)}
        </div>
        <span className="mt-1 text-xs font-medium text-blue-600">Menit</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-300 text-xl font-bold text-white">
          {formatTime(timeLeft.seconds)}
        </div>
        <span className="mt-1 text-xs font-medium text-blue-600">Detik</span>
      </div>
    </div>
  )
}
