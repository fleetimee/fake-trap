"use client"

import { useRouter } from "next/navigation"
import NotFound2 from "@/public/lottie/not-found2.json"

import { LottieClient } from "@/components/lottie-anim"
import { Shell } from "@/components/shell/lobby-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function KnowledgePublicNotFound() {
  const router = useRouter()

  return (
    <Shell variant="markdown">
      <div className="flex h-full items-center justify-center py-24 sm:h-screen sm:py-8 md:py-0">
        <Card className="flex flex-col items-center justify-center space-y-8 p-4">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold leading-none tracking-tight md:text-3xl">
              Yah Maaf !
            </CardTitle>
            <CardDescription>
              Pengetahuan atau Modul yang kamu cari tidak ditemukan
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-4 space-y-12 md:space-y-0">
            <LottieClient animationData={NotFound2} className=" md:size-96" />

            <div className="flex justify-end">
              <Button
                className="w-full md:w-auto"
                onClick={() => router.back()}
              >
                Kembali
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  )
}
