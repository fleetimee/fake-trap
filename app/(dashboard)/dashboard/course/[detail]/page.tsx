import { Metadata } from "next"
import { RocketIcon } from "@radix-ui/react-icons"

import { getCourseById } from "@/lib/fetcher/course/course-fetcher"
import { getKnowledgeByid } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { getUser } from "@/lib/fetcher/user/user-fetcher"
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
  const detailCourseData = await getCourseById(params.detail)

  return {
    title: detailCourseData.data.course_name,
  }
}

export default async function DetailCourse({
  params,
}: {
  params: { detail: string }
}) {
  const detailCourseData = getCourseById(params.detail)
  const userList = getUser()

  const [courseDataResp, userDataResp] = await Promise.all([
    detailCourseData,
    userList,
  ])

  const courseKnowledgeResp = await getKnowledgeByid(
    courseDataResp.data.id_knowledge
  )

  console.log(courseKnowledgeResp)

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
        <DetailSidebarCourse dataKnowledge={courseKnowledgeResp} />
      </div>
    </DashboardShell>
  )
}
