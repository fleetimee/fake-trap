import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOperatorCategory } from "@/lib/fetcher/category-fetcher"
import { getOneKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { getReference } from "@/lib/fetcher/reference-fetcher"
import { getRule } from "@/lib/fetcher/rule-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { UpdateKnowledgeForm } from "@/components/forms/update-knowledge-form"
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
  title: "Update Materi",
  description: "Halaman untuk mengubah materi",
}

interface PemateriDivisiUpdateKnowledgePageProps {
  params: {
    idKnowledge: string
  }
}

export default async function PemateriDivisiUpdateKnowledgePage({
  params,
}: PemateriDivisiUpdateKnowledgePageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const knowledge = await getOneKnowledge({
    token: user?.token,
    idKnowledge: params.idKnowledge,
  })

  const reference = await getReference({
    token: user?.token,
    refCode: "003",
  })

  const category = await getOperatorCategory({
    token: user?.token,
    limit: 999,
    page: 1,
  })

  if (
    knowledge.code === 400 ||
    knowledge.data.created_by !== tokenExtracted?.id
  ) {
    return notFound()
  }

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
            href: `/pemateri-divisi/knowledge/update/${knowledge.data.id_knowledge}`,
            title: knowledge.data.knowledge_title,
          },
          {
            href: "#",
            title: "Update",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">
            Update Materi:{" "}
            <span className="font-semibold">
              {knowledge.data.knowledge_title}
            </span>
          </CardTitle>
          <CardDescription>Update Materi yang sudah ada</CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateKnowledgeForm
            knowledge={knowledge.data}
            category={category}
            reference={reference}
          />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
