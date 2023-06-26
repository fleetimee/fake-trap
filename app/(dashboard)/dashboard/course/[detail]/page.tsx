import { Metadata } from "next"

import { getCourseById } from "@/lib/fetcher/course/course-fetcher"
import { getUser } from "@/lib/fetcher/user/user-fetcher"
import { convertDatetoString } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseDetailContent } from "@/components/app/course/detail/course-detail-content"
import { Icons } from "@/components/icons"
import { DashboardShell } from "@/components/shell"
import { YoutubePlayer } from "@/components/youtube-player"

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

  return (
    <DashboardShell>
      <div className="flex h-auto flex-col gap-4 px-2 lg:flex-row">
        <CourseDetailContent data={courseDataResp} user={userDataResp} />
      </div>
    </DashboardShell>
  )
}
