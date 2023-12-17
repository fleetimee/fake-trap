import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getListCategory,
  getOneKnowledge,
  getReference,
  getRule,
} from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
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
  title: "Update Pengetahuan",
  description: "Halaman untuk mengubah knowledge",
}

interface OperatorLMSUpdateKnowledgePageProps {
  params: {
    idKnowledge: string
  }
}

export default async function OperatorLMSUpdateKnowledgePage({
  params,
}: OperatorLMSUpdateKnowledgePageProps) {
  const user = await getCurrentUser()

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

  const category = await getListCategory({
    token: user?.token,
    limit: 999,
    page: 1,
  })

  if (knowledge.code === 400) {
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
            href: "/operator-lms",
            title: "Dashboard",
          },
          {
            href: "/operator-lms/knowledge",
            title: "Pengetahuan",
          },
          {
            href: `/operator-lms/knowledge/update/${knowledge.data.id_knowledge}`,
            title: "Update Pengetahuan",
          },
          {
            href: `/operator-lms/knowledge/update/${knowledge.data.id_knowledge}`,
            title: knowledge.data.knowledge_title,
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl">
            Update Pengetahuan:{" "}
            <span className="font-semibold">
              {knowledge.data.knowledge_title}
            </span>
          </CardTitle>
          <CardDescription>Update Pengetahuan yang sudah ada</CardDescription>
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
