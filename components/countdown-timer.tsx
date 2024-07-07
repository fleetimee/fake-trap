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
  console.log("CountdownTimer", endDate)

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
    <div>
      <span>{`Deadline: ${formatTime(timeLeft.days)}d ${formatTime(timeLeft.hours)}h ${formatTime(timeLeft.minutes)}m ${formatTime(timeLeft.seconds)}s`}</span>
    </div>
  )
}
