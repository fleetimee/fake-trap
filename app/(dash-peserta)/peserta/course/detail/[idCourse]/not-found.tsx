import { Metadata } from "next"
import Link from "next/link"
import { IconNotebook } from "@tabler/icons-react"
import { ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import { Shell } from "@/components/shell/lobby-shell"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Pembelajaran Tidak Ditemukan",
  description: "Status Pembelajaran",
}

export default async function CourseNotFound() {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-6 dark:from-blue-950/50 dark:to-blue-900/50">
          <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
            Status Pembelajaran
          </h3>
          <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
            Informasi mengenai pembelajaran yang anda cari
          </p>
        </div>

        <Separator className="bg-blue-100 dark:bg-blue-900/50" />

        <div className="flex h-full w-full items-center justify-center p-4">
          <Card className="flex h-full min-h-[400px] w-full items-center justify-center border-dashed border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/50 sm:min-h-[500px]">
            <CardContent className="w-full max-w-md text-center">
              <div className="space-y-6">
                <IconNotebook className="mx-auto h-16 w-16 text-blue-400" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-300">
                    Pembelajaran Tidak Tersedia
                  </h2>
                  <p className="text-blue-600/80 dark:text-blue-400/80">
                    Maaf, pembelajaran yang Anda cari belum tersedia atau sedang
                    dalam proses persiapan atau sudah berakhir.
                  </p>
                </div>
                <Link
                  href="/peserta/course"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      className:
                        "mx-auto flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800",
                    })
                  )}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Kembali ke Daftar Pembelajaran
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  )
}
