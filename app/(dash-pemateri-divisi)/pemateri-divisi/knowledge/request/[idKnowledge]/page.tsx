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
  title: "Ajukan Pengetahuan Baru",
}

interface PemateriDivisiKnowledgePageNewProps {
  params: {
    idKnowledge: string
  }
}

export default async function PemateriDivisiRequestKnowledgeNew({
  params,
}: PemateriDivisiKnowledgePageNewProps) {
  const user = await getCurrentUser()

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
            href: "/pemateri-divisi/knowledge/request",
            title: "Ajukan Pengetahuan Baru",
          },
        ]}
      />
    </DashboardShell>
  )
}
