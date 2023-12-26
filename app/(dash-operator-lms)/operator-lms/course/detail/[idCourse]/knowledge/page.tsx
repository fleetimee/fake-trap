import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCourseKnowledges } from "@/lib/fetcher/course-fetcher"
import { getCurrentUser } from "@/lib/session"
import { CoursesKnowledges } from "@/components/course-knowledges"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CourseKnowledgePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  params: {
    idCourse: string
  }
}

export default async function CourseKnowledgePage({
  searchParams,
  params,
}: CourseKnowledgePageProps) {
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

      <div className="flex justify-end">
        <Link
          href={`/operator-lms/course/detail/${params.idCourse}/knowledge/new`}
          className={buttonVariants({
            size: "sm",
            className: "flex h-8 w-fit justify-end",
          })}
        >
          <span className=" text-sm font-medium">Tambah Materi</span>
        </Link>
      </div>

      <CoursesKnowledges
        courseKnowledges={knowledges.data}
        pageCount={knowledges.totalPage}
      />
    </div>
  )
}
