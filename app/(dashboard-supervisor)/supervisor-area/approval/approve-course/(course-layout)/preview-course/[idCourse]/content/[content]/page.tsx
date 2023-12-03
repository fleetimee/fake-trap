import { redirect } from "next/navigation"

import { CourseOneRes } from "@/types/course/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

import RenderContentWrapper from "./_components/render-content-wrapper"


interface GetOneContentProps {
  token: string | undefined
  idContent: string
}

async function getOneContent({ token, idContent }: GetOneContentProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/${idContent}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface GetOneCourseProps {
  token: string | undefined
  idCourse: number
}

async function getOneCourse({
  token,
  idCourse,
}: GetOneCourseProps): Promise<CourseOneRes> {
  const courseOne = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await courseOne.json()
}

interface CoursePreviewContentProps {
  params: {
    idCourse: string
    content: string
  }
}

export default async function CoursePreviewContent({
  params,
}: CoursePreviewContentProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [coursePreview, contentPreview] = await Promise.all([
    getOneCourse({ token: user.token, idCourse: Number(params.idCourse) }),
    getOneContent({ token: user.token, idContent: params.content }),
  ])

  return (
    <RenderContentWrapper
      contentType={contentPreview.data.content_type}
      contentData={contentPreview.data}
      courseDataResp={coursePreview}
    />
  )
}
