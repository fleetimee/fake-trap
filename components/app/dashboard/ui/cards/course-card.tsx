import { CourseListRes } from "@/types/course/res"
import { CardDashboardIndicator } from "@/components/app/dashboard/ui/"

interface GetCourseCountProps {
  token: string | undefined
}

async function getCourse({
  token,
}: GetCourseCountProps): Promise<CourseListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course?limit=1`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface DashboardCourseCardCountProps {
  token: string | undefined
}

export async function DashboardCourseCardCount({
  token,
}: DashboardCourseCardCountProps) {
  const courseResp = await getCourse({
    token: token,
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
