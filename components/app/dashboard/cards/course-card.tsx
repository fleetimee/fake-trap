import { Course } from "@/types/course-res"
import { getCurrentUser } from "@/lib/session"

import { CardDashboardIndicator } from "../card-dashboard-indicator"

async function getCourse(token: string | undefined): Promise<Course> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course?limit=1`,
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

export async function DashboardCourseCardCount(props: {
  token: string | undefined
}) {
  const courseResp = await getCourse(props.token)

  return (
    <CardDashboardIndicator
      title="Kursus"
      icon="course"
      content={courseResp.count}
      description="Kursus yang tersedia"
    />
  )
}
