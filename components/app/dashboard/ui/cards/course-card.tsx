import { getCourse } from "@/lib/fetcher/course-fetcher"
import { CardDashboardIndicator } from "@/components/app/dashboard/ui/"

interface DashboardCourseCardCountProps {
  token: string | undefined
}

export async function DashboardCourseCardCount({
  token,
}: DashboardCourseCardCountProps) {
  const courseResp = await getCourse({
    token: token,
    limit: 1,
    page: 1,
  })

  return (
    <CardDashboardIndicator
      title="Pelatihan"
      icon="course"
      content={courseResp.count}
      description="Pelatihan yang tersedia"
    />
  )
}
