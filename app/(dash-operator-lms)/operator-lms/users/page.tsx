import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorQuiz, getReference } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell, QuizTableShell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Managemen User",
  description: "Managemen User",
}

interface OperatorLMSUsersPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function OperatorLMSUsersPage({
  searchParams,
}: OperatorLMSUsersPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/users",
            title: "Managemen User",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Managemen User"
            description="Kelola user yang dapat mengakses sistem"
          />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex xl:justify-end"
        >
          {/* <Button className="ml-2" size="sm">
            Buat Test Baru
          </Button> */}

          <Link
            href="/operator-lms/users/new"
            className={buttonVariants({
              size: "sm",
              className: "ml-2",
            })}
          >
            Buat User Baru
          </Link>

          {/* <CreateQuizSheet referenceResp={referenceResp} /> */}
        </MotionDiv>
      </div>
    </DashboardShell>
  )
}
