import Image from "next/image"
import { redirect } from "next/navigation"

import { ThreadListRes } from "@/types/threads/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"

interface MemberCourseDetailPageProps {
  params: {
    detail: string
  }
}

interface GetThreadsListProps {
  idCourse: string
  token: string | undefined
  limit: number
  page: number
}

async function getThreadList({
  idCourse,
  token,
  limit,
  page,
}: GetThreadsListProps): Promise<ThreadListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}/threads?limit=${limit}&page=${page}`,
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

export default async function MemberCourseDetailPage({}: MemberCourseDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <p className="text-2xl font-bold text-gray-800">Course Detail</p>
    </MotionDiv>
  )
}
