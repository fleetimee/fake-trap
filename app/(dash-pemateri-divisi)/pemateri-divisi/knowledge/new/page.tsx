import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCategoryByCreator, getReference, getRule } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
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

export default async function PemateriDivisiKnowledgePageNew() {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const reference = await getReference({
    token: user?.token,
    refCode: "003",
  })

  const category = await getCategoryByCreator({
    createdBy: tokenExtracted?.id,
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
            title: "Pengetahuan",
          },
          {
            href: "/pemateri-divisi/knowledge/new",
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
