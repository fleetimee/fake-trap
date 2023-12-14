import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getThreadList } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { Threads } from "@/components/threads"
import { buttonVariants } from "@/components/ui/button"
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

  const { page, per_page, store_page } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const threads = await getThreadList({
    token: user?.token,
    idCourse: params.idCourse,
    limit: limitInitial,
    page: pageInitial,
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Threads</h3>
        <p className="text-sm text-muted-foreground">
          Buat thread baru atau lihat thread yang sudah ada. dan berkomunikasi
          dengan peserta lainnya.
        </p>
      </div>
      <Separator />

      <div className="flex justify-end">
        <Link
          href={`/peserta/course/detail/${params.idCourse}/threads/new`}
          className={buttonVariants({
            size: "lg",
            variant: "outline",
          })}
        >
          Buat Thread Baru
        </Link>
      </div>

      {threads && threads.data && threads.data.length > 0 ? (
        <Threads
          data={threads.data}
          pageCount={threads.totalPage}
          idCourse={params.idCourse}
        />
      ) : (
        <div className="mt-9 flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-semibold">Belum ada thread</h1>
          <p className="text-sm text-muted-foreground">
            Buat thread baru untuk memulai diskusi
          </p>
        </div>
      )}
    </div>
  )
}
