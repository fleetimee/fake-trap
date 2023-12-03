import Image from "next/image"
import { redirect } from "next/navigation"

import { CourseOneRes } from "@/types/course/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"





interface GetOneCourseProps {
  token: string | undefined
  idKnowledge: string
}

async function getOneCourse({
  token,
  idKnowledge,
}: GetOneCourseProps): Promise<CourseOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idKnowledge}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return await res.json()
}

interface MemberCourseDetailPageProps {
  params: {
    detail: string
  }
}

export default async function MemberCourseDetailPage({
  params,
}: MemberCourseDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const courseOneRes = await getOneCourse({
    token: user?.token,
    idKnowledge: params.detail,
  })

  return (
    <Image
      src={courseOneRes.data.image}
      alt={courseOneRes.data.course_name}
      className="aspect-video rounded-lg object-cover shadow-md grayscale hover:grayscale-0"
      width={1280}
      height={720}
    />
  )
}
