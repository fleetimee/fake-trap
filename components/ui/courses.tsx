"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { UserEnrolledCourseListResData } from "@/types/me/res"
import CourseCardV2 from "@/components/course-card"
import { PaginationButton } from "@/components/pagers/pagination-button"

interface CoursesProps {
  courses: UserEnrolledCourseListResData[]
  pageCount: number
}

export function Courses({ courses, pageCount }: CoursesProps) {
  const id = React.useId()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()

  // Search params
  const page = searchParams?.get("page") ?? "1"
  const sort = searchParams?.get("sort") ?? "createdAt.desc"

  const per_page = searchParams?.get("per_page") ?? "6"

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  return (
    <section className="flex flex-col gap-6 space-y-6">
      <div className="grid grid-cols-1 gap-6  xl:grid-cols-2">
        {courses.map((course) => (
          <CourseCardV2
            key={course.id_course}
            courseId={course.id_course.toString()}
            courseAuthor={course.tutor_name}
            courseDate={new Date(course.created_at).toLocaleDateString()}
            courseDescription={course.course_desc}
            courseImage={course.image}
            courseTitle={course.course_name}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <PaginationButton
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          createQueryString={createQueryString}
        />
      </div>
    </section>
  )
}
