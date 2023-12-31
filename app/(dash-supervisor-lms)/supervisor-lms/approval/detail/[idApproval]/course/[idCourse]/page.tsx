import Image from "next/image"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneCourse, getOneKnowledge } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"

interface CourseDetailPageProps {
  params: {
    idCourse: string
  }
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const course = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  // if (course.code === 400 || course.data.tutor_uuid !== tokenExtracted?.id) {
  //   return notFound()
  // }

  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_URL}${course?.data?.image}`}
      alt={course?.data?.course_name}
      className="aspect-video rounded-lg object-cover shadow-md "
      width={1280}
      height={720}
    />
  )
}
