import { CourseGetNewRes } from "@/types/course/res/course-get-new"
import { CardDashboard } from "@/components/app/dashboard/ui"

interface GetNewCourseProps {
  token: string | undefined
}

async function getNewestCourse({
  token,
}: GetNewCourseProps): Promise<CourseGetNewRes> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/new`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return response.json()
}

interface DashboardCourseHighlightProps {
  token: string | undefined
}

export async function DashboardCourseHighlight({
  token,
}: DashboardCourseHighlightProps) {
  const courseResp = await getNewestCourse({ token })

  return (
    <CardDashboard
      title="Kursus Terbaru"
      icon="course"
      name={courseResp.data.course_name}
      image={courseResp.data.image}
    />
  )
}
