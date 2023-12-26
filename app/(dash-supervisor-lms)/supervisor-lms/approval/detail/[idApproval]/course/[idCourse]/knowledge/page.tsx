import React from "react"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCourseKnowledges } from "@/lib/fetcher/course-fetcher"
import { getCurrentUser } from "@/lib/session"
import { CoursesKnowledges } from "@/components/course-knowledges"
import { Separator } from "@/components/ui/separator"

interface SpvLMSCourseKnowledgePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  params: {
    idCourse: string
  }
}

export default async function SpvLMSCourseKnowledgePageProps({
  searchParams,
  params,
}: SpvLMSCourseKnowledgePageProps) {
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
