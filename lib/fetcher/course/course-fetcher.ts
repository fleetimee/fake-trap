import { PostCourseRequest } from "@/types/course-req"
import { Course, CourseByIdResponse } from "@/types/course-res"
import { NewestCourse } from "@/types/newest-course-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"

enum CourseUrl {
  course = "secure/course",
  newestCourse = "secure/course/new",
}

/**
 * Fetches a list of courses with a specified limit.
 * @param limit The maximum number of courses to fetch.
 * @returns A Promise that resolves to a Course object.
 */
async function getCourse(limit: number): Promise<Course> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${CourseUrl.course}?limit=${limit}`,
    {
      method: "GET",
      headers: headersObj,
      cache: "no-cache",
    }
  )

  const data = await res.json()

  await new Promise((resolve) => setTimeout(resolve, 1500))

  return data
}

/**
 * Fetches a course by its ID.
 * @param id The ID of the course to fetch.
 * @returns A Promise that resolves to a CourseByIdResponse object.
 */
async function getCourseById(id: string): Promise<CourseByIdResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${CourseUrl.course}/${id}`,
    {
      method: "GET",
      headers: headersObj,
      cache: "no-cache",
    }
  )

  const data = await res.json()

  return data
}

/**
 * Fetches the newest course.
 * @returns A Promise that resolves to a NewestCourse object.
 */
async function getNewestCourse(): Promise<NewestCourse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/${CourseUrl.newestCourse}`,
    {
      method: "GET",
      headers: headersObj,
      cache: "no-cache",
    }
  )

  const data = await res.json()

  return data
}

async function postCourse(input: PostCourseRequest) {}

export { getCourse, getNewestCourse, getCourseById }
