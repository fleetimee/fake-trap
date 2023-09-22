import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"

interface MemberCourseDetailPageProps {
  params: {
    detail: string
  }
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
