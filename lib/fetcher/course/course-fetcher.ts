import { PostCourseRequest } from "@/types/course-req"
import { Course, CourseByIdResponse } from "@/types/course-res"
import { NewestCourse } from "@/types/newest-course-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { toast } from "@/components/ui/use-toast"

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
  try {
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
  } catch (error) {
    console.error(error)
    throw Error("Failed to fetch course.")
  }
}

/**
 * Fetches a course by its ID.
 * @param id The ID of the course to fetch.
 * @returns A Promise that resolves to a CourseByIdResponse object.
 */
async function getCourseById(id: string): Promise<CourseByIdResponse> {
  try {
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
  } catch (error) {
    console.error(error)
    throw Error("Failed to fetch course.")
  }
}
/**
 * Fetches the newest course.
 * @returns A Promise that resolves to a NewestCourse object.
 */
async function getNewestCourse(): Promise<NewestCourse> {
  try {
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
  } catch (error) {
    console.error(error)
    throw new Error("Failed to fetch newest course data")
  }
}

/**
 * Posts a new course to the server.
 * @param input The course data to be posted.
 * @returns A Promise that resolves to void.
 */
async function postCourse(input: PostCourseRequest): Promise<void> {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${CourseUrl.course}`,
      {
        method: "POST",
        headers: headersObj,
        body: JSON.stringify(input),
      }
    )

    const res = await req.json()

    if (res) {
      toast({
        title: "Success",
        description: "Course successfully created.",
      })
    }
  } catch (error) {
    console.error(error)
    throw new Error("Failed to create course")
  }
}

export { getCourse, getNewestCourse, getCourseById, postCourse }
