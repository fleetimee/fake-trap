"use client"

import React from "react"

export function BGGrid({ children }: { children?: React.ReactNode }) {
  // State can be: radial (linear-gradient), background-size
  // useReducer instead. And pass property down
  return (
    <div className="relative min-h-screen w-full">
      {children}
      <div
        className="fixed inset-0 z-[-1] h-screen w-screen bg-transparent" // bg-gradient-to-b from-muted to-background
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--muted)), hsl(var(--background)))",
        }}
      >
        <div
          className="h-full w-full" // bg-[length:50px_50px]
          style={{
            backgroundSize: "50px 50px",
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, hsl(var(--muted)/80%) 25%, hsl(var(--muted)/80%) 26%, transparent 27%, transparent 74%, hsl(var(--muted)/80%) 75%, hsl(var(--muted)/80%) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, hsl(var(--muted)/80%) 25%, hsl(var(--muted)/80%) 26%, transparent 27%, transparent 74%, hsl(var(--muted)/80%) 75%, hsl(var(--muted)/80%) 76%, transparent 77%, transparent)",
          }}
        />
      </div>
    </div>

    //     <div className="relative min-h-screen w-full">
    //   {children}
    //   <div
    //     className="fixed inset-0 z-[-1] h-screen w-screen bg-transparent"
    //     style={{
    //       backgroundImage: "linear-gradient(to bottom, #1a237e, #2196f3)",
    //     }}
    //   />
    // </div>
  )
}

export function BGGridSlider() {
  return <input type="range" />
}
