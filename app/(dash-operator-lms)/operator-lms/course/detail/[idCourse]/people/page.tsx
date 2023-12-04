import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCourseUser, getUserV2 } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { Separator } from "@/components/ui/separator"

interface CoursePeoplePageProps {
  params: {
    idCourse: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function CoursePeoplePage({
  params,
  searchParams,
}: CoursePeoplePageProps) {
  const user = await getCurrentUser()

  const { page, per_page, sort, category_name } = searchParams ?? {}

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "created_at"
  const sortOrderInitial = typeof sort === "string" ? sort : "desc"
  const searchQueryInitial =
    typeof category_name === "string" ? category_name : ""

  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const users = await getCourseUser({
    token: user?.token,
    idCourse: params.idCourse,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortField,
    orderBy: sortOrder,
    searchQuery: searchQueryInitial,
  })

  console.log(users)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tambahkan Peserta</h3>
        <p className="text-sm text-muted-foreground">
          Tambahkan peserta ke dalam pelatihan ini. Peserta akan mendapatkan
          akses ke semua materi yang ada di pelatihan ini.
        </p>
      </div>
      <Separator />
    </div>
  )
}
