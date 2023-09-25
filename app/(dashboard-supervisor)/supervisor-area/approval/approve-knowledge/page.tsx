import { redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { SupervisorApprovalCountCard } from "@/components/supervisor/card/approval-count-card"

interface GetKnowledgeApprovalCount {
  token: string | undefined
}

async function getKnowledgeApprovalCount({ token }: GetKnowledgeApprovalCount) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/count`,
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

const parentVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const childrenVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,

    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default async function SupervisorApproveCoursePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [approvalCountResp] = await Promise.all([
    getKnowledgeApprovalCount({
      token: user?.token,
    }),
  ])

  return (
    <MotionDiv
      className="space-y-4"
      variants={parentVariant}
      initial="initial"
      animate="animate"
    >
      <div className="child grid min-h-[200px] gap-6 md:grid-cols-1 lg:grid-cols-3">
        <MotionDiv className="child" variants={childrenVariant}>
          <SupervisorApprovalCountCard
            approvalCount={approvalCountResp?.data?.approved}
            title="Pengetahuan Di Setujui"
            icon={<Icons.check className="h-6 w-6 text-green-500" />}
            description="Pengetahuan yang telah di setujui oleh supervisor"
          />
        </MotionDiv>

        <MotionDiv className="child" variants={childrenVariant}>
          <SupervisorApprovalCountCard
            approvalCount={approvalCountResp?.data?.pending}
            title="Pengetahuan Pending"
            icon={<Icons.pending className="h-6 w-6 text-yellow-500" />}
            description="Pengetahuan yang masih menunggu persetujuan"
          />
        </MotionDiv>

        <MotionDiv className="child" variants={childrenVariant}>
          <SupervisorApprovalCountCard
            approvalCount={approvalCountResp?.data?.rejected}
            title="Pengetahuan Di Tolak"
            icon={<Icons.close className="h-6 w-6 text-red-500" />}
            description="Pengetahuan yang telah di tolak"
          />
        </MotionDiv>
      </div>
    </MotionDiv>
  )
}
