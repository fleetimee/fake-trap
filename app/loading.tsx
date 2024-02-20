"use client"

import Loader from "@/public/lottie/loading1.json"
import Lottie from "lottie-react"

import { LottieClient } from "@/components/lottie-anim"

export default function GlobalLoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* <LottieClient animationData={Loader} className="size-1/6" /> */}

      <Lottie animationData={Loader} className="size-1/6" />
    </div>
  )
}
