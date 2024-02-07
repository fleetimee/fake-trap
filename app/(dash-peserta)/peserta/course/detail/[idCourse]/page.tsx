import Image from "next/image"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { CourseAvailability } from "@/lib/enums/status"
import { getOneCourse } from "@/lib/fetcher/course-fetcher"
import { getCurrentUser } from "@/lib/session"
import { getCourseStatus } from "@/lib/utils"

interface CourseDetailPageProps {
  params: {
    idCourse: string
  }
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

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
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_URL}${course?.data?.image}`}
      alt={course?.data?.course_name}
      className="aspect-video rounded-none object-cover shadow-md md:rounded-lg "
      width={1280}
      height={720}
    />
  )
}
