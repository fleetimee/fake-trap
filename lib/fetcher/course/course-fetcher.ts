import { Course } from "@/types/course-response"
import { NewestKnowledge } from "@/types/newest-knowledge-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"

enum CourseUrl {
  course = "/secure/course",
  newestCourse = "/secure/course/newest",
}

async function getCourse(limit: number): Promise<Course> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${CourseUrl.course}?limit=${limit}`,
    {
      headers: headersObj,
      next: {
        revalidate: 3,
      },
    }
  )

  const data = await res.json()

  await new Promise((resolve) => setTimeout(resolve, 1500))

  return data
}

async function getNewestCourse(): Promise<NewestKnowledge> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${CourseUrl.newestCourse}`,
    {
      headers: headersObj,
      next: {
        revalidate: 3,
      },
    }
  )

  const data = await res.json()

  await new Promise((resolve) => setTimeout(resolve, 1500))

  return data
}

export { getCourse }
