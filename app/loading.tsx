"use client"

import Image from "next/image"
import BpdLogo from "@/public/images/logo.png"
import Loader from "@/public/lottie/loading1.json"
import Lottie from "lottie-react"

import { Icons } from "@/components/icons"
import { LottieClient } from "@/components/lottie-anim"

export default function GlobalLoadingPage() {
  return (
    // <div className="flex min-h-screen items-center justify-center">
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 space-y-4">
      {/* <LottieClient animationData={Loader} className="size-1/6" /> */}

      {/* <Lottie animationData={Loader} className="size-1/6" /> */}

      <Image
        src={BpdLogo}
        alt="BPD Logo"
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6"
      />

      <Icons.spinner className="w-1/6 animate-spin" />

      {/* <p className="text-2xl font-bold text-gray-500">...</p> */}
    </div>
  )
}
