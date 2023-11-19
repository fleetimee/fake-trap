import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Button, buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Test dan Latihan",
  description: "Test",
}

interface OperatorLMSExercisePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function OperatorLMSExercisePage({
  searchParams,
}: OperatorLMSExercisePageProps) {
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
            href: "/operator-lms/exercise",
            title: "Test dan Latihan",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Test dan Latihan"
            description="Buat Pre Test, Post Test, dan Latihan untuk peserta Anda."
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
            href="/operator-lms/exercise/new"
            className={buttonVariants({
              size: "sm",
              className: "ml-2",
            })}
          >
            Buat Test Baru
          </Link>

          {/* <CreateQuizSheet referenceResp={referenceResp} /> */}
        </MotionDiv>
      </div>
    </DashboardShell>
  )
}
