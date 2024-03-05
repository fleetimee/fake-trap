import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorCategory } from "@/lib/fetcher/category-fetcher"
import { getReference } from "@/lib/fetcher/reference-fetcher"
import { getRule } from "@/lib/fetcher/rule-fetcher"
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
  title: "Tambah Materi Baru",
  description: "Operator LMS New Knowledge Page",
}

export default async function PemateriDivisiKnowledgePageNew() {
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
            href: "/pemateri-divisi",
            title: "Dashboard",
          },
          {
            href: "/pemateri-divisi/knowledge",
            title: "Materi",
          },
          {
            href: "/pemateri-divisi/knowledge/new",
            title: "Tambah Materi Baru",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">Tambah Materi</CardTitle>
          <CardDescription>Tambah Materi Baru</CardDescription>
        </CardHeader>

        <CardContent>
          <AddKnowledgeForm
            reference={reference}
            category={category}
            baseUrl="/pemateri-divisi/knowledge"
          />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
