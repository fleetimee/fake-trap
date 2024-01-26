import React from "react"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { CourseAvailability } from "@/lib/enums/status"
import { getCourseKnowledges, getOneCourse } from "@/lib/fetcher/course-fetcher"
import { getCurrentUser } from "@/lib/session"
import { getCourseStatus } from "@/lib/utils"
import { CoursesKnowledges } from "@/components/course-knowledges"
import { Separator } from "@/components/ui/separator"

interface PesertaCourseKnowledgePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  params: {
    idCourse: string
  }
}

export default async function PesertaCourseKnowledgePageProps({
  searchParams,
  params,
}: PesertaCourseKnowledgePageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const { page, per_page, search, sort } = searchParams

  const pageInitial = typeof page === "string" ? parseInt(page) : 1
  const limitInitial = typeof per_page === "string" ? parseInt(per_page) : 6
  const searchInitial = typeof search === "string" ? search : ""

  const orderByInitial = typeof sort === "string" ? sort : "desc"
  const sortByInitial = typeof sort === "string" ? sort : "created_at"

  const knowledges = await getCourseKnowledges({
    token: user?.token,
    idCourse: params.idCourse,
    page: pageInitial,
    limit: limitInitial,
    searchQuery: searchInitial,
    orderBy: orderByInitial,
    sortBy: sortByInitial,
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
        <h3 className="text-lg font-medium">Materi Pelatihan</h3>
        <p className="text-sm text-muted-foreground">
          Berikut adalah daftar materi yang ada di pelatihan ini.
        </p>
      </div>
      <Separator />

      <CoursesKnowledges
        courseKnowledges={knowledges.data}
        pageCount={knowledges.totalPage}
      />
    </div>
  )
}
