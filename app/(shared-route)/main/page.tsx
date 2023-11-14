import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString, extractToken } from "@/lib/utils"

import { PemateriInterface } from "./_components/pemateri_interface"
import { SupervisorPemateriInterface } from "./_components/supervisor_pemateri_interface"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard",
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user || !tokenExtracted.group) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const dateNow = convertDatetoString(new Date().toString())

  const getDayWithText = new Date().toLocaleString("en", {
    weekday: "long",
  })

  const userExtracted = extractToken(user.token)

  const parentVariant: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const childrenVariant: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
  }

  if (tokenExtracted.group === 1) {
    return (
      <PemateriInterface
        dateNow={dateNow}
        username={userExtracted.username}
        getDayWithText={getDayWithText}
        parentVariant={parentVariant}
        childrenVariant={childrenVariant}
        token={user.token}
      />
    )
  }

  if (tokenExtracted.group === 2) {
    return <SupervisorPemateriInterface />
  }

  if (tokenExtracted.group === 3) {
    return <p>Operator LMS</p>
  }

  if (tokenExtracted.group === 4) {
    return <p>Supervisor Operator LMS</p>
  }

  if (tokenExtracted.group === 5) {
    return <p>Peserta</p>
  }

  if (tokenExtracted.group === 6) {
    return <p>Executive</p>
  }
}
