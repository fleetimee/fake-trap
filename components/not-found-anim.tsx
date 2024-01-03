"use client"

import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { LottieClient } from "@/components/lottie-anim"
import { buttonVariants } from "@/components/ui/button"

interface NotFoundAnimProps {
  animationData: any
  title: string
  description: string
  buttonLabel?: string
  backButtonUrl: string
}

export function NotFoundAnim({
  animationData,
  title,
  description,
  buttonLabel,
  backButtonUrl,
}: NotFoundAnimProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6 py-3">
      <h1 className="text-2xl font-semibold uppercase text-gray-700 dark:text-gray-200">
        {title}
      </h1>
      <LottieClient
        animationData={animationData}
        className="h-full max-w-2xl"
      />

      <h1
        className="whitespace-pre-wrap text-center font-heading text-lg uppercase
            text-gray-600 dark:text-gray-200
            "
      >
        <Balancer>{description}</Balancer>
      </h1>

      <Link
        href={backButtonUrl}
        className={buttonVariants({
          className: "max-w-lg",
        })}
      >
        {buttonLabel ? buttonLabel : "Kembali"}
      </Link>
    </div>
  )
}
