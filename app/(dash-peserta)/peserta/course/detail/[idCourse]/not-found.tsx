import { Metadata } from "next"
import Link from "next/link"
import { IconNotebook } from "@tabler/icons-react"
import { ArrowLeft, FileText } from "lucide-react"

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
        <div>
          <h3 className="text-lg font-medium">Status Pembelajaran</h3>
          <p className="text-sm text-muted-foreground">
            Informasi mengenai pembelajaran yang anda cari
          </p>
        </div>

        <Separator />

        <div className="flex h-full w-full items-center justify-center p-4">
          <Card className="flex h-full min-h-[400px] w-full items-center justify-center sm:min-h-[500px]">
            <CardContent className="w-full max-w-md text-center">
              <div className="space-y-6">
                <IconNotebook className="mx-auto h-16 w-16 text-gray-400" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold">Not Available</h2>
                  <p className="text-muted-foreground">
                    Maaf, pembelajaran yang Anda cari belum tersedia atau sedang
                    dalam proses persiapan atau sudah berakhir.
                  </p>
                </div>
                <Link
                  href="/peserta/course"
                  className={cn(
                    buttonVariants({
                      variant: "default",
                      size: "lg",
                      className: "mx-auto flex items-center",
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
