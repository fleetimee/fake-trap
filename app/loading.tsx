"use client"

import Ripple from "@/components/ripple"

export default function GlobalLoadingPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-white">
        B-LIVE
      </p>
      <Ripple />
    </div>
  )
}
