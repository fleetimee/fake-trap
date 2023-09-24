import { Variants } from "framer-motion"

import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { SupervisorApprovalCountCard } from "@/components/supervisor/card/approval-count-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const parentVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const childrenVariant: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      bounce: 0.25,
      duration: 0.5,
      type: "spring",
      stiffness: 500,
    },
  },
}

interface GetApprovalCount {
  token: string | undefined
}

async function getApprovalCount({ token }: GetApprovalCount) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/count`,
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

export default async function SupervisorApproveCoursePage() {
  const user = await getCurrentUser()

  const approvalCount = await getApprovalCount({ token: user?.token })

  console.log(approvalCount)

  return (
    <MotionDiv
      className="space-y-4"
      initial="initial"
      animate="animate"
      variants={parentVariant}
    >
      <MotionDiv
        className="child grid min-h-[200px] gap-6 md:grid-cols-1 lg:grid-cols-3"
        variants={childrenVariant}
      >
        <SupervisorApprovalCountCard
          approvalCount={approvalCount?.data?.approved}
          title="Pelatihan Di Setujui"
          icon={<Icons.check className="h-6 w-6 text-green-500" />}
          description="Pelatihan yang telah di setujui"
        />

        <SupervisorApprovalCountCard
          approvalCount={approvalCount?.data?.pending}
          title="Pelatihan Pending"
          icon={<Icons.pending className="h-6 w-6 text-yellow-500" />}
          description="Pelatihan yang masih menunggu persetujuan"
        />

        <SupervisorApprovalCountCard
          approvalCount={approvalCount?.data?.rejected}
          title="Pelatihan Di Tolak"
          icon={<Icons.close className="h-6 w-6 text-red-500" />}
          description="Pelatihan yang telah di tolak"
        />
      </MotionDiv>
    </MotionDiv>
  )
}
