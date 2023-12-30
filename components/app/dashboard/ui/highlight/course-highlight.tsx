import { getNewestCourse } from "@/lib/fetcher/course-fetcher"
import { CardDashboard } from "@/components/app/dashboard/ui"

interface DashboardCourseHighlightProps {
  token: string | undefined
}

export async function DashboardCourseHighlight({
  token,
}: DashboardCourseHighlightProps) {
  const courseResp = await getNewestCourse({ token })

  return (
    <CardDashboard
      url={`dashboard/course/${courseResp.data.id_course}`}
      title="Pelatihan Terbaru"
      icon="course"
      name={courseResp.data.course_name}
      image={courseResp.data.image}
      buttonText="Lihat Pelatihan"
    />
  )
}
