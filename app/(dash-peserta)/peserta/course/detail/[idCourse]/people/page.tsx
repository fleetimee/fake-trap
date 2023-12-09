import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCourseUser } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"





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
