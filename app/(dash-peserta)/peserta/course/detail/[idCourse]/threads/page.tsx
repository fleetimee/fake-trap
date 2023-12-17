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

      <Threads
        data={threads.data}
        pageCount={threads.totalPage}
        idCourse={params.idCourse}
      />
    </div>
  )
}
