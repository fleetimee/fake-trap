import { Metadata } from "next"
import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { convertDatetoString, extractToken } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Supervisor Area",
  description: "Supervisor Area",
}

const parentVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const childrenVariant: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
}
const childrenVariantTwo: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.5 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
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
