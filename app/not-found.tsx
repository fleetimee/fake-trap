import { Metadata } from "next"
import NotFoundTwo from "@/public/lottie/not_found_global.json"

import { LottieClient } from "@/components/lottie-anim"

export const metadata: Metadata = {
  title: "What are you looking for?",
  description: "404",
}

export default function NotFound() {
  return (
    <main>
      <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-start px-4 md:px-8">
        <div className="mx-auto max-w-lg text-gray-600">
          <div className="space-y-3 text-center">
            <h3 className="font-semibold text-indigo-600">404 Error</h3>
            <p className="text-4xl font-semibold text-gray-800 sm:text-5xl">
              Not Found
            </p>
            <p>
              Sepertinya halaman yang anda cari tidak ditemukan. Silahkan
              kembali ke halaman sebelumnya.
            </p>
          </div>

          <div className="flex justify-center">
            <LottieClient
              animationData={NotFoundTwo}
              className="w-full max-w-lg"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
