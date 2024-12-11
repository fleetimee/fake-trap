import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  BarChart,
  BookOpen,
  FileText,
  GraduationCap,
  Printer,
} from "lucide-react"

import { authOptions } from "@/lib/auth"
import {
  getUserPastCourseKnowledge,
  getUserPastResult,
} from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const metadata: Metadata = {
  title: "Perpustakaan",
  description: "Halaman perpustakaan",
}

const getScoreColor = (score: number) => {
  if (score >= 90) return "bg-gradient-to-r from-green-500 to-emerald-500"
  if (score >= 80) return "bg-gradient-to-r from-emerald-500 to-teal-500"
  if (score >= 70) return "bg-gradient-to-r from-blue-500 to-cyan-500"
  if (score >= 60) return "bg-gradient-to-r from-yellow-500 to-orange-500"
  return "bg-gradient-to-r from-red-500 to-pink-500"
}

export default async function LibraryPage() {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  const pastResults = await getUserPastResult({
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  const pastCourseKnowledge = await getUserPastCourseKnowledge({
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const completedCoursesCount = pastResults?.data.reduce((count, course) => {
    const hasPreTest = course.pretest_result && course.pretest_result.length > 0
    const hasPostTest =
      course.posttest_result && course.posttest_result.length > 0
    return count + (hasPreTest && hasPostTest ? 1 : 0)
  }, 0)

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
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardContent className="flex items-center gap-2 p-3 sm:gap-4 sm:p-6">
              <BookOpen className="h-5 w-5 sm:h-8 sm:w-8" />
              <div>
                <p className="text-2xs font-medium sm:text-sm">Total Materi</p>
                <h3 className="text-lg font-bold sm:text-2xl">
                  {pastCourseKnowledge?.data.length || 0}
                </h3>
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
                <h3 className="text-lg font-bold sm:text-2xl">
                  {completedCoursesCount || 0}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Materials Section */}
        <div className="space-y-3 sm:space-y-6">
          <h2 className="text-lg font-bold text-blue-900 sm:text-2xl">
            Materi Pembelajaran
          </h2>

          {pastCourseKnowledge?.data.length === 0 ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Belum ada materi
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Mulai belajar untuk melihat materi di sini
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pastCourseKnowledge?.data.map((knowledge) => (
                <Link
                  key={knowledge.id_knowledge}
                  href={`/peserta/knowledge/detail/${knowledge.id_knowledge}`}
                  className="group flex h-full"
                >
                  <div className="flex w-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.image}`}
                        alt={knowledge.knowledge_title}
                        width={400}
                        height={225}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-2.5 sm:p-4">
                      <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-blue-900 group-hover:text-blue-700 sm:text-base">
                        {knowledge.knowledge_title}
                      </h3>
                      <p className="line-clamp-3 flex-1 text-xs text-gray-600 sm:text-sm">
                        {knowledge.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Exam Results Section */}
        <div className="space-y-3 sm:space-y-6">
          <h2 className="text-lg font-bold text-blue-900 sm:text-2xl">
            Hasil Ujian
          </h2>

          {pastResults?.data.length === 0 ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50/50 p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Belum ada hasil ujian
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Selesaikan beberapa tes untuk melihat hasil di sini
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pastResults?.data.map((result, index) => (
                <div
                  key={result.id_course}
                  className="overflow-hidden rounded-lg border bg-white shadow-sm"
                >
                  <div className="border-b bg-gray-50 p-2.5 sm:p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="line-clamp-2 text-sm font-semibold text-blue-900 sm:text-base">
                        {result.course_name}
                      </h3>
                      <span className="text-2xs self-start rounded-full bg-blue-100 px-2 py-0.5 font-medium text-blue-800 sm:self-auto sm:text-sm">
                        Pembelajaran {pastResults.data.length - index}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 p-2.5 sm:gap-4 sm:p-4 md:grid-cols-2">
                    {/* Pre Test Card */}
                    <div className="rounded-lg border p-2.5 sm:p-4">
                      <div className="mb-2.5 flex items-center justify-between sm:mb-4">
                        <h4 className="text-sm font-medium text-gray-900 sm:text-base">
                          Hasil Pre Test
                        </h4>
                        <BarChart className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
                      </div>
                      {result.pretest_result?.length ? (
                        <div className="space-y-2 sm:space-y-3">
                          {result.pretest_result.map((test) => (
                            <div
                              key={test.id_user_quiz}
                              className="flex items-center justify-between rounded-lg bg-gray-50 p-2 sm:p-3"
                            >
                              <div className="mr-2 max-w-[calc(100%-48px)] sm:mr-4 sm:max-w-[calc(100%-64px)]">
                                <p className="truncate text-xs font-medium text-gray-900 sm:text-sm">
                                  {test.quiz_title}
                                </p>
                                <Badge
                                  className={`
                                    mt-1 px-2 py-0.5 text-xs font-medium shadow-sm sm:px-3 sm:py-1
                                    ${getScoreColor(test.score)}
                                    transition-all duration-200
                                    hover:scale-105 hover:shadow-md
                                  `}
                                >
                                  {test.score}
                                  <span className="text-2xs ml-1 opacity-90 sm:text-xs">
                                    poin
                                  </span>
                                </Badge>
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link
                                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${tokenExtracted.id}/${test.id_user_quiz}`}
                                      target="_blank"
                                    >
                                      <Button
                                        size="icon"
                                        className="h-6 w-6 rounded-full bg-blue-600 hover:bg-blue-700 sm:h-8 sm:w-8"
                                      >
                                        <Printer className="h-3 w-3 sm:h-4 sm:w-4" />
                                      </Button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs sm:text-sm">
                                      Cetak Hasil
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-xs text-gray-500 sm:text-sm">
                          Belum ada hasil pre-test
                        </p>
                      )}
                    </div>

                    {/* Post Test Card */}
                    <div className="rounded-lg border p-2.5 sm:p-4">
                      <div className="mb-2.5 flex items-center justify-between sm:mb-4">
                        <h4 className="text-sm font-medium text-gray-900 sm:text-base">
                          Hasil Post Test
                        </h4>
                        <BarChart className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
                      </div>
                      {result.posttest_result?.length ? (
                        <div className="space-y-2 sm:space-y-3">
                          {result.posttest_result.map((test) => (
                            <div
                              key={test.id_user_quiz}
                              className="flex items-center justify-between rounded-lg bg-gray-50 p-2 sm:p-3"
                            >
                              <div className="mr-2 max-w-[calc(100%-48px)] sm:mr-4 sm:max-w-[calc(100%-64px)]">
                                <p className="truncate text-xs font-medium text-gray-900 sm:text-sm">
                                  {test.quiz_title}
                                </p>
                                <Badge
                                  className={`
                                    mt-1 px-2 py-0.5 text-xs font-medium shadow-sm sm:px-3 sm:py-1
                                    ${getScoreColor(test.score)}
                                    transition-all duration-200
                                    hover:scale-105 hover:shadow-md
                                  `}
                                >
                                  {test.score}
                                  <span className="text-2xs ml-1 opacity-90 sm:text-xs">
                                    poin
                                  </span>
                                </Badge>
                              </div>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link
                                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${tokenExtracted.id}/${test.id_user_quiz}`}
                                      target="_blank"
                                    >
                                      <Button
                                        size="icon"
                                        className="h-6 w-6 rounded-full bg-blue-600 hover:bg-blue-700 sm:h-8 sm:w-8"
                                      >
                                        <Printer className="h-3 w-3 sm:h-4 sm:w-4" />
                                      </Button>
                                    </Link>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs sm:text-sm">
                                      Cetak Hasil
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-xs text-gray-500 sm:text-sm">
                          Belum ada hasil post-test
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
