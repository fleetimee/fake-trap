import { Metadata } from "next"
import { redirect } from "next/navigation"

import { SupervisorCountOneRes } from "@/types/approval/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString, extractToken } from "@/lib/utils"

interface GetSupervisorAcceptedKnowledgeCountProps {
  token: string | undefined
  status: string
  uuid: string
}

async function getSupervisorKnowledgeCount({
  token,
  status,
  uuid,
}: GetSupervisorAcceptedKnowledgeCountProps): Promise<SupervisorCountOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/${status}/${uuid}/count`,
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

interface GetSupervisorCourseCountProps {
  token: string | undefined
  status: string
  uuid: string
}

async function getSupervisorCourseCount({
  token,
  status,
  uuid,
}: GetSupervisorCourseCountProps): Promise<SupervisorCountOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/${status}/${uuid}/count`,
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

export const metadata: Metadata = {
  title: "Supervisor Area",
  description: "Supervisor Area",
}

export default async function SupervisorMePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "login")
  }

  const dateNow = convertDatetoString(new Date().toString())

  const getDayWithText = new Date().toLocaleString("en", {
    weekday: "long",
  })

  const userExtracted = extractToken(user.token)

  return <p>Penis</p>
}
