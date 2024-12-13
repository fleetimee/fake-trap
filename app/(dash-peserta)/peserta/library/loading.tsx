import { BookOpen, GraduationCap } from "lucide-react"

import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <DashboardShell className="px-2 sm:px-4 md:px-6">
      <BreadCrumbs
        segments={[
          {
            href: "/peserta",
            title: "Dashboard",
          },
          {
            href: "/peserta/library",
            title: "Library",
          },
        ]}
      />

      <DashboardHeader
        heading="Library"
        description="Catch up dan refresh materi yang sudah kamu pelajari disini."
      />

      <div className="space-y-3 sm:space-y-6">
        {/* Stats Cards Loading */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="flex items-center gap-2 p-3 sm:gap-4 sm:p-6">
              <BookOpen className="h-5 w-5 sm:h-8 sm:w-8" />
              <div>
                <p className="text-2xs font-medium sm:text-sm">Total Materi</p>
                <Skeleton className="h-6 w-12 bg-white/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
            <CardContent className="flex items-center gap-2 p-3 sm:gap-4 sm:p-6">
              <GraduationCap className="h-5 w-5 sm:h-8 sm:w-8" />
              <div>
                <p className="text-2xs font-medium sm:text-sm">
                  Pembelajaran Selesai
                </p>
                <Skeleton className="h-6 w-12 bg-white/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Materials Loading */}
        <div className="space-y-3 sm:space-y-6">
          <h2 className="text-lg font-bold text-blue-900 sm:text-2xl">
            Materi Pembelajaran
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex w-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm"
              >
                <Skeleton className="aspect-[16/9] w-full" />
                <div className="flex flex-1 flex-col space-y-2 p-2.5 sm:p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Results Loading */}
        <div className="space-y-3 sm:space-y-6">
          <h2 className="text-lg font-bold text-blue-900 sm:text-2xl">
            Hasil Ujian
          </h2>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border bg-white shadow-sm"
              >
                <div className="border-b bg-gray-50 p-2.5 sm:p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 p-2.5 sm:gap-4 sm:p-4 md:grid-cols-2">
                  {Array.from({ length: 2 }).map((_, j) => (
                    <div key={j} className="rounded-lg border p-2.5 sm:p-4">
                      <div className="mb-2.5 flex items-center justify-between sm:mb-4">
                        <Skeleton className="h-5 w-1/3" />
                      </div>
                      <div className="space-y-2">
                        {Array.from({ length: 2 }).map((_, k) => (
                          <div
                            key={k}
                            className="flex items-center justify-between rounded-lg bg-gray-50 p-2 sm:p-3"
                          >
                            <div className="mr-2 flex-1 space-y-2">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-4 w-16" />
                            </div>
                            <Skeleton className="h-8 w-8 rounded-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
