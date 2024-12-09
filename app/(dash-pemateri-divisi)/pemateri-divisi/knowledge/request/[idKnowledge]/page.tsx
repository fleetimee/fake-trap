import { Metadata } from "next"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import {
  getOneKnowledge,
  lookupKnowledge,
} from "@/lib/fetcher/knowledge-fetcher"
import { getUsersSupervisor } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { RequestKnowledgeForm } from "@/components/forms/request-knowledge-form"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Ajukan Materi Baru",
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

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [knowledge, knowledgeLookup, supervisors] = await Promise.all([
    getOneKnowledge({
      idKnowledge: params.idKnowledge,
      token: user?.token,
    }),
    lookupKnowledge({
      idKnowledge: Number(params.idKnowledge),
      token: user?.token,
    }),
    getUsersSupervisor({
      token: user?.token,
      email: tokenExtracted?.email,
    }),
  ])

  if (
    knowledgeLookup.data ||
    knowledge.data.created_by !== tokenExtracted?.id
  ) {
    return notFound()
  }

  return (
    <DashboardShell>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="bg-grid-blue-500/[0.025] absolute inset-0 -z-10" />
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
              href: "/pemateri-divisi/knowledge/request",
              title: "Ajukan Materi Baru",
            },
          ]}
        />

        <div className="container mx-auto py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="relative overflow-hidden border border-blue-100 bg-white/70 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent" />
              <CardHeader className="relative space-y-2 border-b border-blue-100/20 bg-white/40 p-6">
                <CardTitle className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-2xl font-bold text-transparent">
                  Preview Materi
                </CardTitle>
                <CardDescription className="text-sm text-blue-600/80">
                  Ini adalah preview dari Materi yang akan anda ajukan.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-6 p-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="bookTitlePreview"
                    className="text-lg font-bold text-blue-800"
                  >
                    Judul Materi
                  </Label>
                  <div className="rounded-lg bg-blue-50/50 p-4 text-lg shadow-inner">
                    {knowledge.data.knowledge_title}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="bookDescriptionPreview"
                    className="text-lg font-bold text-blue-800"
                  >
                    Deskripsi Materi
                  </Label>
                  <div className="rounded-lg bg-blue-50/50 p-4 shadow-inner">
                    {knowledge.data.description}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="bookImagePreview"
                    className="text-lg font-bold text-blue-800"
                  >
                    Image
                  </Label>
                  <div className="group overflow-hidden rounded-xl border border-blue-100 bg-white/80 shadow-lg">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.data.image}`}
                      alt={knowledge.data.knowledge_title}
                      width={300}
                      height={300}
                      className="w-full transform object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border border-blue-100 bg-white/70 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent" />
              <CardHeader className="relative space-y-2 border-b border-blue-100/20 bg-white/40 p-6">
                <CardTitle className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-2xl font-bold text-transparent">
                  Cari Approval Pemateri
                </CardTitle>
                <CardDescription className="text-sm text-blue-600/80">
                  Silahkan isi form dibawah ini untuk mengajukan materi baru.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative p-6">
                <div className="rounded-lg bg-white/80 p-4 shadow-lg">
                  <RequestKnowledgeForm
                    idKnowledge={params.idKnowledge}
                    requestUuid={knowledge.data.created_by}
                    supervisors={supervisors.data}
                    baseUrl="/pemateri-divisi/knowledge/"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
