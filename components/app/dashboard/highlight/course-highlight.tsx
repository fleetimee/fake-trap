import { NewestCourse } from "@/types/newest-course-res"

import { CardDashboard } from "../card-dashboard"

async function getNewestCourse(
  token: string | undefined
): Promise<NewestCourse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/new`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function DashboardCourseHighlight(props: {
  token: string | undefined
}) {
  const courseResp = await getNewestCourse(props.token)

  return (
    <CardDashboard
      title="Kursus Terbaru"
      icon="course"
      name={courseResp.data.course_name}
      image={courseResp.data.image}
    />
  )
}
