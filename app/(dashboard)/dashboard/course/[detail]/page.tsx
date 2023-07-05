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
      <div className="flex flex-row gap-4 px-2">
        <Alert className="basis-full">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Informasi!</AlertTitle>
          <AlertDescription>
            Kursus ini berdasarkan pada pengetahuan{" "}
            <span className="font-bold">
              {courseKnowledgeResp.data.knowledge_title}
            </span>
          </AlertDescription>
        </Alert>
      </div>
      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <CourseDetailContent data={courseDataResp} user={userDataResp} />
        <DetailSidebarCourse
          dataKnowledge={courseKnowledgeResp}
          dataCourse={courseDataResp}
          dataQuiz={quizResp}
        />
      </div>
    </DashboardShell>
  )
}
