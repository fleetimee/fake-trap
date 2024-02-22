"use client"

import Loader from "@/public/lottie/loading1.json"

import { LottieClient } from "@/components/lottie-anim"

export default function GlobalLoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LottieClient animationData={Loader} className="size-1/6" />

      {/* <Lottie animationData={Loader} className="size-1/6" /> */}

      {/* <p className="text-2xl font-bold text-gray-500">...</p> */}
    </div>
  )
}
