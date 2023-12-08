import React from "react"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCourseUser } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { CourseUserTableShell } from "@/components/shell/course-user-table-shell"
import { Separator } from "@/components/ui/separator"

interface CoursePeoplePageProps {
  params: {
    idCourse: string
  }
}

export default async function CoursePeoplePage({
  params,
}: CoursePeoplePageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const users = await getCourseUser({
    idCourse: params.idCourse,
    token: user?.token,
    limit: 1000,
    page: 1,
  })
}
