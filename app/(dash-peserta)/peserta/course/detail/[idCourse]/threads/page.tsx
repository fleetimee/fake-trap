import Link from "next/link"
import { redirect } from "next/navigation"
import { MessageCircle, Plus } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getThreadList } from "@/lib/fetcher/threads-fetcher"
import { getCurrentUser } from "@/lib/session"
import { Threads } from "@/components/threads"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CourseThreadPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  params: {
    idCourse: string
  }
}

export default async function CourseThreadPage({
  searchParams,
  params,
}: CourseThreadPageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, search, store_page } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const searchInitial = typeof search === "string" ? search : ""

  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"

  const sortBy = sortByInitial.split(".")[0]
  const orderBy = orderByInitial.split(".")[1]

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const threads = await getThreadList({
    token: user?.token,
    idCourse: params.idCourse,
    limit: limitInitial,
    page: pageInitial,
    orderBy: orderBy,
    sortBy: sortBy,
    searchQuery: searchInitial,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-6 dark:from-blue-950/50 dark:to-blue-900/50">
        <div>
          <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
            Forum Diskusi
          </h3>
          <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
            Buat thread baru atau lihat thread yang sudah ada dan berkomunikasi
            dengan peserta lainnya dalam pembelajaran ini.
          </p>
        </div>
        {threads.data.length > 0 && (
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <Link
              href={`/peserta/course/detail/${params.idCourse}/threads/new`}
            >
              <Plus className="mr-2 h-4 w-4" />
              Thread Baru
            </Link>
          </Button>
        )}
      </div>
      <Separator className="bg-blue-100 dark:bg-blue-900/50" />

      {threads.data.length === 0 ? (
        <div className="flex h-full w-full items-center justify-center p-4">
          <Card className="flex h-full min-h-[400px] w-full items-center justify-center border-dashed border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/50 sm:min-h-[500px]">
            <CardContent className="w-full max-w-md text-center">
              <div className="space-y-6">
                <MessageCircle className="mx-auto h-16 w-16 text-blue-400" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-semibold text-blue-700 dark:text-blue-300">
                    Belum ada diskusi
                  </h2>
                  <p className="text-blue-600/80 dark:text-blue-400/80">
                    Jadilah yang pertama memulai diskusi! Buat thread untuk
                    bertanya atau berbagi pengetahuan.
                  </p>
                </div>
                <Button
                  className="mx-auto flex items-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                  size="lg"
                  asChild
                >
                  <Link
                    href={`/peserta/course/detail/${params.idCourse}/threads/new`}
                  >
                    Mulai Diskusi Pertama
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Threads
          data={threads.data}
          pageCount={threads.totalPage}
          idCourse={params.idCourse}
          link="/peserta"
        />
      )}
    </div>
  )
}
