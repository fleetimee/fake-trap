import { Metadata } from "next"
import { redirect } from "next/navigation"
import { RocketIcon } from "@radix-ui/react-icons"

import { authOptions } from "@/lib/auth"
import {
  getAllQuizDataWithNullSection,
  getAllUsersData,
  getCourseDataById,
  getKnowledgeDataById,
} from "@/lib/datasource"
import { getCurrentUser } from "@/lib/session"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DetailSidebarCourse } from "@/components/app/course/detail-sidebar-course"
import { CourseDetailContent } from "@/components/app/course/detail/course-detail-content"
import { CourseDetailShell } from "@/components/app/course/detail/course-detail-shell"
import { DashboardShell } from "@/components/shell"

type Props = {
  params: {
    detail: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getCurrentUser()

  const detailCourseData = await getCourseDataById({
    id: params.detail,
    token: user?.token,
  })

  return {
    title: detailCourseData.data.course_name,
  }
}

export default async function DetailCourse({
  params,
}: {
  params: { detail: string }
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const detailCourseData = getCourseDataById({
    id: params.detail,
    token: user?.token,
  })

  const userList = getAllUsersData({ token: user?.token })

  const quizList = getAllQuizDataWithNullSection({ token: user?.token })

  const [courseDataResp, userDataResp, quizResp] = await Promise.all([
    detailCourseData,
    userList,
    quizList,
  ])

  const courseKnowledgeResp = await getKnowledgeDataById({
    id: courseDataResp.data.id_knowledge,
    token: user?.token,
  })

  return (
    <DashboardShell>
      <CourseDetailShell
        courseDataResp={courseDataResp}
        courseKnowledgeResp={courseKnowledgeResp}
        quizResp={quizResp}
        userDataResp={userDataResp}
      />
    </DashboardShell>
  )
}
