import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getUserEnrolledCourseList } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import CourseCardV2 from "@/components/course-card"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"





export const metadata: Metadata = {
  title: "Pelatihan Kamu",
  description: "Pelatihan",
}

export default async function PesertaCoursePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const tokenExtracted = extractToken(user?.token)

  const userCourse = await getUserEnrolledCourseList({
    token: user?.token,
    uuid: tokenExtracted?.id,
    limit: 100,
    page: 1,
    searchQuery: "",
  })

  console.log(userCourse)

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/peserta",
            title: "Dashboard",
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <DashboardHeader
          heading="Pelatihan Kamu"
          description="Ini merupakan pelatihan yang kamu ikuti, jika tidak menemukan pelatihan yang kamu ikuti, silahkan hubungi admin.
          "
        />
      </MotionDiv>

      <Separator />

      <div className="grid grid-cols-1 items-start justify-between gap-2 sm:grid-cols-2">
        {userCourse.data.map((course) => (
          <CourseCardV2
            key={course.id_course}
            courseId={course.id_course.toString()}
            courseAuthor={course.tutor_name}
            courseDate={new Date(course.created_at).toLocaleDateString()}
            courseDescription={course.course_desc}
            courseImage={course.image}
            courseTitle={course.course_name}
          />
        ))}
      </div>
    </DashboardShell>
  )
}
