import Image from "next/image"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { CourseAvailability } from "@/lib/enums/status"
import { getOneCourse } from "@/lib/fetcher/course-fetcher"
import { getUserPretestCheck } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken, getCourseStatus } from "@/lib/utils"
import { Icons } from "@/components/icons"

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

  const tokenExtracted = extractToken(user?.token)

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

  const checkUserPretest = await getUserPretestCheck({
    idCourse: params.idCourse,
    token: user?.token,
    userUuid: tokenExtracted?.id,
  })

  console.log(checkUserPretest)

  return checkUserPretest.data ? (
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_URL}${course?.data?.image}`}
      alt={course?.data?.course_name}
      className="aspect-video rounded-none object-cover shadow-md md:rounded-lg "
      width={1280}
      height={720}
    />
  ) : (
    <div className="relative">
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_URL}${course?.data?.image}`}
        alt={course?.data?.course_name}
        className="aspect-video rounded-none object-cover shadow-md md:rounded-lg "
        width={1280}
        height={720}
      />

      <div className="absolute inset-0 flex  flex-col items-center justify-center bg-black/50 grayscale">
        <Icons.lock className="size-16 text-white" />
        <p className="mt-4 max-w-md text-center text-white">
          Silahkan kerjakan Pretest terlebih dahulu, untuk membuka materi
          pelatihan.
        </p>
      </div>
    </div>
  )
}
