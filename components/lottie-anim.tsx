"use client"

import Lottie from "lottie-react"

interface LottieAnimationProps extends React.ComponentProps<typeof Lottie> {
  animationData: any
}

export function LottieClient(props: LottieAnimationProps) {
  return <Lottie {...props} />
}
