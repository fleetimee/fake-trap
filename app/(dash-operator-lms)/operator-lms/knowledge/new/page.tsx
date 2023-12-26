import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getReference, getRule } from "@/lib/fetcher"
import { getOperatorCategory } from "@/lib/fetcher/category-fetcher"
import { getCurrentUser } from "@/lib/session"
import { AddKnowledgeForm } from "@/components/forms/add-knowledge-form"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Tambah Pengetahuan Baru",
  description: "Operator LMS New Knowledge Page",
}

export default async function OperatorLMSKnowledgePageNew() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const reference = await getReference({
    token: user?.token,
    refCode: "003",
  })

  const category = await getOperatorCategory({
    token: user?.token,
    page: 1,
    limit: 999,
  })

  const rule = await getRule({
    token: user?.token,
    idRole: "3",
  })

  if (!rule.data.can_write_knowledge) {
    return notFound()
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
            href: "/operator-lms/knowledge",
            title: "Pengetahuan",
          },
          {
            href: "/operator-lms/knowledge/new",
            title: "Tambah Pengetahuan Baru",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Tambah Pengetahuan</CardTitle>
          <CardDescription>Tambah Pengetahuan Baru</CardDescription>
        </CardHeader>

        <CardContent>
          <AddKnowledgeForm reference={reference} category={category} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
