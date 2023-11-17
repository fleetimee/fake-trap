import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getRule } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Button, buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Pengetahuan",
  description: "Operator LMS Knowledge Page",
}

export default async function OperatorLMSKnowledgePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const rule = await getRule({
    idRole: "3",
    token: user?.token,
  })

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/knowledge",
            title: "Pengetahuan",
          },
        ]}
      />

      <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DashboardHeader
            heading="Pengetahuan"
            description="Pengetahuan yang tersedia di e-learning"
          />
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex xl:justify-end"
        >
          {rule.data.can_write_knowledge ? (
            <Link
              href="/operator-lms/knowledge/new"
              className={buttonVariants({
                size: "sm",
                className: "ml-2",
              })}
            >
              Buat Materi Baru
            </Link>
          ) : (
            <Button className="ml-2" size="sm" disabled>
              Buat Materi Baru
            </Button>
          )}
        </MotionDiv>
      </div>
    </DashboardShell>
  )
}
