import { Metadata } from "next"

import { getCourseById } from "@/lib/fetcher/course/course-fetcher"

type Props = {
  params: {
    detail: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detailCourseData = await getCourseById(params.detail)

  return {
    title: detailCourseData.data.course_name,
  }
}

export default async function DetailCourse({
  params,
}: {
  params: { detail: string }
}) {
  const detailCourseData = await getCourseById(params.detail)

  return <h1>penis</h1>
}
