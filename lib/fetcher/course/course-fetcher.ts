import { Course } from "@/types/course-response"
import { NewestCourse } from "@/types/newest-course-res"
import { NewestKnowledge } from "@/types/newest-knowledge-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"

enum CourseUrl {
  course = "secure/course",
  newestCourse = "secure/course/new",
}

async function getCourse(limit: number): Promise<Course> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${CourseUrl.course}?limit=${limit}`,
    {
      headers: headersObj,
      cache: "no-cache",
    }
  )

  const data = await res.json()

  await new Promise((resolve) => setTimeout(resolve, 1500))

  return data
}

async function getNewestCourse(): Promise<NewestCourse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${CourseUrl.newestCourse}`,
    {
      headers: headersObj,
      cache: "no-cache",
    }
  )

  const data = await res.json()

  await new Promise((resolve) => setTimeout(resolve, 1500))

  return data
}

export { getCourse, getNewestCourse }
