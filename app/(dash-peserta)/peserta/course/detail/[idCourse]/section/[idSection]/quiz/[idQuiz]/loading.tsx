import Loader from "@/public/lottie/loading1.json"

import { LottieClient } from "@/components/lottie-anim"

export default function CourseQuizLoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LottieClient animationData={Loader} className="size-1/2" />
    </div>
  )
}
