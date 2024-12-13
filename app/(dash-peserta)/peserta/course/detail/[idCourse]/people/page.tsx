import React from "react"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { CourseAvailability } from "@/lib/enums/status"
import { getCourseUsers, getOneCourse } from "@/lib/fetcher/course-fetcher"
import { getCurrentUser } from "@/lib/session"
import { getCourseStatus } from "@/lib/utils"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { CourseUserTableShell } from "@/components/shell/course-user-table-shell"
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

  const { page, per_page, sort, name } = searchParams ?? {}

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 10
  const sortFieldInitial = typeof sort === "string" ? sort : "created_at"
  const sortOrderInitial = typeof sort === "string" ? sort : "desc"
  const searchQueryInitial = typeof name === "string" ? name : ""

  const sortField = sortFieldInitial.split(".")[0]
  const sortOrder = sortOrderInitial.split(".")[1]

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const users = await getCourseUsers({
    token: user?.token,
    idCourse: params.idCourse,
    page: pageInitial,
    limit: limitInitial,
    sortBy: sortField,
    orderBy: sortOrder,
    searchQuery: searchQueryInitial,
  })

  const course = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  const courseStatus = getCourseStatus({
    dateEnd: course.data.date_end,
    dateStart: course.data.date_start,
  })

  if (courseStatus !== CourseAvailability.ACTIVE) {
    return notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Daftar Peserta</h3>
        <p className="text-sm text-muted-foreground">
          Daftar Peserta yang mengikuti pembelajaran ini
        </p>
      </div>
      <Separator />

      <React.Suspense
        fallback={
          <DataTableSkeleton columnCount={6} isNewRowCreatable={true} />
        }
      >
        <CourseUserTableShell
          data={users.data}
          pageCount={users.totalPage}
          shouldExportable={false}
          totalCount={users.count}
        />
      </React.Suspense>
    </div>
  )
}
