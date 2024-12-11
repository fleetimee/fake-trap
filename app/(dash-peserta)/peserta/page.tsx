import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  ArrowRightIcon,
  Cloud,
  CloudDrizzle,
  CloudSun,
  MessageSquareIcon,
  PartyPopper,
  Scroll,
  Sun,
} from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getPesertaCount } from "@/lib/fetcher/menu-fetcher"
import {
  getPesertaEnrolledCourses,
  getUserRecentPostList,
  getUserRecentPostsList,
} from "@/lib/fetcher/users-fetcher"
import {
  getMotivationalQuote,
  getWeatherData,
  getWeatherDescription,
} from "@/lib/fetcher/utils-fetcher"
import { getCurrentUser } from "@/lib/session"
import {
  convertDatetoString,
  dateNow,
  extractToken,
  getDayWithText,
} from "@/lib/utils"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Widget } from "@/components/widget"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function PesertaPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const [
    loggedOnUser,
    globalCount,
    course,
    recentPost,
    recentPostALl,
    weather,
    quote,
  ] = await Promise.all([
    getLoggedOnUser({
      token: user?.token,
      uuid: tokenExtracted?.id,
    }),
    getPesertaCount({
      token: user?.token,
      userId: tokenExtracted?.id,
    }),
    getPesertaEnrolledCourses({
      token: user?.token,
      uuid: tokenExtracted?.id,
      limit: 5,
      page: 1,
    }),
    getUserRecentPostList({
      token: user?.token,
      uuid: tokenExtracted?.id,
    }),
    getUserRecentPostsList({
      token: user?.token,
      uuid: tokenExtracted?.id,
    }),
    getWeatherData(),
    getMotivationalQuote(),
  ])

  const getWeatherIcon = (code: number) => {
    if (code >= 61) return <CloudDrizzle className="size-6 text-blue-500" />
    if (code >= 51) return <Cloud className="size-6 text-gray-500" />
    if (code >= 45) return <CloudSun className="size-6 text-orange-500" />
    return <Sun className="size-6 text-yellow-500" />
  }

  console.log("weather", weather)

  console.log("quote", quote)

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
        ]}
      />

      <div className="space-y-6">
        <DashboardHeader
          heading="Dashboard Peserta B-LIVE"
          description={
            "Selamat datang di halaman dashboard peserta. Di sini kamu dapat melihat informasi terkait pembelajaran yang kamu ikuti, aktivitas forum terbaru, dan informasi lainnya."
          }
        />

        <Alert className="border-blue-500/20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
          <PartyPopper className="size-5 text-blue-600" />
          <AlertTitle className="flex items-center gap-2">
            Selamat Datang Kembali,{" "}
            <span className="bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text font-heading text-transparent">
              {loggedOnUser.data?.name}
            </span>
          </AlertTitle>
          <AlertDescription>
            Sekarang hari {getDayWithText}.
            {globalCount.data?.course_count > 0 ? (
              <>
                Saat ini kamu mengikuti{" "}
                <span className="font-medium text-blue-600">
                  {globalCount.data.course_count} pembelajaran
                </span>
                . Tetap semangat belajar!
              </>
            ) : (
              "Yuk mulai jelajahi pembelajaran yang tersedia!"
            )}
          </AlertDescription>
        </Alert>

        <Card className="overflow-hidden border-blue-100/50 bg-gradient-to-br from-white to-blue-50/30 p-0 shadow-lg shadow-blue-100/20 dark:border-blue-900/50 dark:from-gray-900 dark:to-blue-900/10">
          <CardHeader className="border-b border-blue-100/50 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/10">
            <CardTitle className="text-lg text-blue-600 dark:text-blue-400">
              Info Hari Ini
            </CardTitle>
            <CardDescription>
              Cuaca dan kutipan inspirasional untuk memulai hari
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {weather && (
                <div className="group relative overflow-hidden rounded-xl border border-blue-100/50 bg-white/50 p-6 transition-all hover:border-blue-200/50 hover:bg-blue-50/50 dark:border-blue-900/50 dark:bg-gray-900/50 dark:hover:bg-blue-950/10">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-gradient-to-br from-blue-100 to-blue-50 p-3 shadow-inner dark:from-blue-900/50 dark:to-blue-800/50">
                      {getWeatherIcon(weather.weather[0].id)}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading">Cuaca Yogyakarta</h3>
                      <p className="text-sm text-muted-foreground">
                        {getWeatherDescription(weather.weather[0].id)}
                      </p>
                      <p className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                        {weather.main.temp.toFixed(1)}°C
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 transition-opacity group-hover:opacity-40" />
                </div>
              )}

              {quote && (
                <div className="group relative overflow-hidden rounded-xl border border-blue-100/50 bg-white/50 p-6 transition-all hover:border-blue-200/50 hover:bg-blue-50/50 dark:border-blue-900/50 dark:bg-gray-900/50 dark:hover:bg-blue-950/10">
                  <div className="absolute right-2 top-2 select-none font-serif text-6xl opacity-10">
                    "
                  </div>
                  <div className="relative space-y-4">
                    <p className="text-pretty text-sm text-muted-foreground">
                      "{quote.content}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-blue-100 dark:bg-blue-900/50" />
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        — {quote.author}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 transition-opacity group-hover:opacity-40" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Widget
            icon={<Icons.knowledge className="text-emerald-500" />}
            title="Materi Publik"
            subtitle={globalCount.data?.knowledge_count.toString()}
          />
          <Widget
            icon={<Icons.category className="text-blue-500" />}
            title="Modul"
            subtitle={globalCount.data?.category_count.toString()}
          />
          <Widget
            icon={<Icons.quiz className="text-amber-500" />}
            title="Ujian"
            subtitle={globalCount.data?.quiz_count.toString()}
          />
          <Widget
            icon={<Icons.course className="text-rose-500" />}
            title="Pembelajaran"
            subtitle={globalCount.data?.course_count.toString()}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="overflow-hidden border-blue-100/50 bg-gradient-to-br from-white to-blue-50/30 shadow-lg shadow-blue-100/20 dark:border-blue-900/50 dark:from-gray-900 dark:to-blue-900/10 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icons.course className="size-5 text-blue-600" />
                Pembelajaran Terdaftar
              </CardTitle>
              <CardDescription className="text-blue-600/80 dark:text-blue-400/80">
                Daftar pembelajaran yang sedang kamu ikuti saat ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              {course.data.length > 0 ? (
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-lg border border-blue-100/50 bg-white/50 dark:border-blue-900/50 dark:bg-gray-900/50">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nama Pembelajaran</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {course.data.slice(0, 5).map((item) => (
                          <TableRow key={item.id_course}>
                            <TableCell className="font-medium">
                              {item.course_name}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-blue-200 bg-white hover:bg-blue-50 hover:text-blue-600 dark:border-blue-800 dark:bg-gray-900 dark:hover:bg-blue-950"
                  >
                    <Link href="/peserta/course" className="gap-2">
                      Tampilkan Semua
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex h-[300px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-blue-200/50 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/20">
                  <Icons.course className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Belum ada pembelajaran yang diikuti
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-blue-100/50 bg-gradient-to-br from-white to-blue-50/30 shadow-lg shadow-blue-100/20 dark:border-blue-900/50 dark:from-gray-900 dark:to-blue-900/10 lg:row-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareIcon className="size-5 text-blue-600" />
                Forum Terbaru
              </CardTitle>
              <CardDescription className="text-blue-600/80 dark:text-blue-400/80">
                Aktivitas forum terkini
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentPost.data?.length > 0 ? (
                <div className="space-y-4">
                  {recentPost.data.map((post) => (
                    <div
                      key={post.id_post}
                      className="flex flex-col gap-2 rounded-lg border border-blue-100 bg-white p-4 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/50 dark:border-blue-900 dark:bg-gray-900 dark:hover:bg-blue-950/50"
                    >
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <span className="font-heading text-sm">
                          {post.username}
                        </span>
                        <time className="text-xs text-muted-foreground">
                          {convertDatetoString(
                            new Date(post.created_at).toString()
                          )}
                        </time>
                      </div>
                      <Link
                        href={`/peserta/course/detail/${post.id_course}/threads/${post.id_threads}`}
                        className="text-sm font-medium hover:text-primary"
                      >
                        {post.threads_title}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[200px] flex-col items-center justify-center gap-2">
                  <MessageSquareIcon className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Belum ada forum terbaru
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-blue-100/50 bg-gradient-to-br from-white to-blue-50/30 shadow-lg shadow-blue-100/20 dark:border-blue-900/50 dark:from-gray-900 dark:to-blue-900/10 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquareIcon className="size-5 text-blue-600" />
                Aktivitas Forum
              </CardTitle>
              <CardDescription className="text-blue-600/80 dark:text-blue-400/80">
                Diskusi terbaru dari forum pembelajaran yang kamu ikuti
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentPostALl.data?.length > 0 ? (
                <ScrollArea className="h-[350px] rounded-lg border border-blue-100/50 bg-white/50 p-4 dark:border-blue-900/50 dark:bg-gray-900/50 sm:h-[400px]">
                  <div className="space-y-4">
                    {recentPostALl.data.map((post) => (
                      <div
                        key={post.id_post}
                        className="flex flex-col gap-2 rounded-lg border border-blue-100 bg-white p-4 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50/50 dark:border-blue-900 dark:bg-gray-900 dark:hover:bg-blue-950/50"
                      >
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-4">
                          <span className="font-heading text-sm">
                            {post.username}
                          </span>
                          <time className="text-xs text-muted-foreground">
                            {convertDatetoString(
                              new Date(post.created_at).toString()
                            )}
                          </time>
                        </div>
                        <Link
                          href={`/peserta/course/detail/${post.id_course}/threads/${post.id_threads}`}
                          className="text-sm font-medium hover:text-primary"
                        >
                          {post.threads_title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex h-[300px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-blue-200/50 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/20">
                  <Scroll className="size-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Belum ada aktivitas forum saat ini
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
