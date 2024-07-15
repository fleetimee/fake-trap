import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRightIcon, MessageSquareIcon, PartyPopper } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getLoggedOnUser } from "@/lib/fetcher/auth-fetcher"
import { getPesertaCount } from "@/lib/fetcher/menu-fetcher"
import {
  getPesertaEnrolledCourses,
  getUserRecentPostList,
  getUserRecentPostsList,
} from "@/lib/fetcher/users-fetcher"
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

  const [loggedOnUser, globalCount, course, recentPost, recentPostALl] =
    await Promise.all([
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
    ])

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

      <DashboardHeader heading="Peserta" description={dateNow} />

      <Alert>
        <PartyPopper className="size-5" />
        <AlertTitle>
          Halo,{" "}
          <span className="font-heading uppercase text-primary">
            {loggedOnUser.data?.name}
          </span>
        </AlertTitle>
        <AlertDescription>
          Have a Nice{" "}
          <span className="font-heading uppercase">{getDayWithText}</span> !
        </AlertDescription>
      </Alert>

      <div
        className="grid grid-cols-2 gap-4 xl:grid-cols-4"
        style={{ marginTop: "1rem" }}
      >
        <Widget
          icon={<Icons.knowledge className="text-green-500" />}
          title="Materi Publik"
          subtitle={globalCount.data?.knowledge_count.toString()}
        />

        <Widget
          icon={<Icons.category className="text-blue-500" />}
          title="Modul"
          subtitle={globalCount.data?.category_count.toString()}
        />

        <Widget
          icon={<Icons.quiz className="text-yellow-500" />}
          title="Ujian"
          subtitle={globalCount.data?.quiz_count.toString()}
        />

        <Widget
          icon={<Icons.course className="text-red-500" />}
          title="Pembelajaran"
          subtitle={globalCount.data?.course_count.toString()}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        <Card className="h-fit rounded-none md:rounded-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquareIcon className="mr-2 size-5" />
              Forum Activity
            </CardTitle>
            <CardDescription>
              Berikut adalah post terbaru di forum diskusi pembelajaran yang
              kamu ikuti
            </CardDescription>
          </CardHeader>

          <CardContent>
            {recentPostALl.data ? (
              <ScrollArea className="h-[400px] w-full space-y-3 rounded-md border">
                {recentPostALl.data.map((post) => (
                  <div
                    key={post.id_post}
                    className="grid grid-cols-6 items-center justify-between space-y-6 p-4 "
                  >
                    <div className="col-span-4 text-sm">
                      <span className="font-heading uppercase">
                        {post.username}
                      </span>{" "}
                      baru saja membuat post baru pada forum{" "}
                      <span className="font-semibold underline hover:text-blue-600">
                        <Link
                          href={`/peserta/course/detail/${post.id_course}/threads/${post.id_threads}`}
                        >
                          {post.threads_title}
                        </Link>
                      </span>{" "}
                    </div>
                    <p className="col-span-2  text-right text-xs font-light">
                      {convertDatetoString(
                        new Date(post.created_at).toString()
                      )}
                    </p>

                    <Separator className="col-span-6 " />
                  </div>
                ))}
              </ScrollArea>
            ) : (
              <div className="mx-auto flex flex-col items-center justify-center gap-4 py-16">
                <Icons.post className="size-20 text-gray-400" />
                <p className="text-gray-400">Belum ada post yang kamu buat</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="h-fit rounded-none md:rounded-lg lg:col-span-3">
          <CardHeader>
            <CardTitle>Pembelajaran</CardTitle>
            <CardDescription>
              Berikut adalah pembelajaran yang kamu ikuti
            </CardDescription>
          </CardHeader>

          <CardContent className="flex  flex-col gap-4">
            {course.data.length > 0 ? (
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Pembelajaran</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {course.data.map((invoice) => (
                      <TableRow key={invoice.id_course}>
                        <TableCell className="font-medium">
                          {invoice.course_name}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Link href="/peserta/course">
                  <Button variant="outline" className="w-full">
                    Lihat Semua
                    <ArrowRightIcon
                      className="ml-2 size-4"
                      aria-hidden="true"
                    />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mx-auto flex flex-col items-center justify-center gap-4 py-16">
                <Icons.course className="size-20 text-gray-400" />
                <p className="text-gray-400">
                  Belum ada pembelajaran yang diikuti
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="h-fit rounded-none md:rounded-lg lg:col-span-4">
          <CardHeader>
            <CardTitle>Post Activity</CardTitle>
            <CardDescription>
              Berikut adalah post terbaru yang kamu buat
            </CardDescription>
          </CardHeader>

          <CardContent>
            {recentPost.data ? (
              <ScrollArea className="h-[400px] w-full space-y-3 rounded-md border">
                {recentPost.data.map((post) => (
                  <div
                    key={post.id_post}
                    className="grid grid-cols-6 items-center justify-between space-y-6 p-4 "
                  >
                    <div className="col-span-4 text-sm">
                      <span className="font-heading uppercase">
                        {post.username}
                      </span>{" "}
                      baru saja membuat post baru pada forum{" "}
                      <span className="font-semibold underline hover:text-blue-600">
                        <Link
                          href={`/peserta/course/detail/${post.id_course}/threads/${post.id_threads}`}
                        >
                          {post.threads_title}
                        </Link>
                      </span>{" "}
                    </div>
                    <p className="col-span-2  text-right text-xs font-light">
                      {convertDatetoString(
                        new Date(post.created_at).toString()
                      )}
                    </p>

                    <Separator className="col-span-6 " />
                  </div>
                ))}
              </ScrollArea>
            ) : (
              <div className="mx-auto flex flex-col items-center justify-center gap-4 py-16">
                <Icons.post className="size-20 text-gray-400" />
                <p className="text-gray-400">Belum ada post yang kamu buat</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
