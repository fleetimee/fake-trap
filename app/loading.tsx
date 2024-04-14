"use client"

import Image from "next/image"
import BpdLogo from "@/public/images/logo.png"

import { Icons } from "@/components/icons"

export default function GlobalLoadingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2 space-y-4">
      <div className="flex flex-col items-center gap-2 space-y-4">
        <Image
          src={BpdLogo}
          alt="BPD Logo"
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6"
        />

        <Icons.spinner className="w-1/6 animate-spin" />
      </div>
    </div>
  )
}
