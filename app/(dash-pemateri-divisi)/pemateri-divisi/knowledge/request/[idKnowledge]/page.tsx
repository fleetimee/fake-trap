import { Metadata } from "next"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { fetchUsersByGroupId } from "@/lib/fetcher"
import {
  getOneKnowledge,
  lookupKnowledge,
} from "@/lib/fetcher/knowledge-fetcher"
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
    fetchUsersByGroupId({
      token: user?.token,
      idGroup: 2,
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

      <div className="lg:flex lg:items-start lg:space-x-10">
        <Card className="lg:w-1/2">
          <CardHeader>
            <CardTitle>Preview Pengetahuan</CardTitle>
            <CardDescription>
              Ini adalah preview dari pengetahuan yang akan anda ajukan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bookTitlePreview" className="font-bold">
                Judul Pengetahuan
              </Label>
              <div id="bookTitlePreview">{knowledge.data.knowledge_title}</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bookDescriptionPreview" className="font-bold">
                Deskripsi Pengetahuan
              </Label>
              <div id="bookDescriptionPreview">
                {knowledge.data.description}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookImagePreview" className="font-bold">
                Image
              </Label>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.data.image}`}
                alt={knowledge.data.knowledge_title}
                width={300}
                height={300}
                className="rounded-xl transition-all duration-300 ease-in-out "
              />
            </div>
          </CardContent>
        </Card>
        <Card className="lg:w-1/2">
          <CardHeader>
            <CardTitle>Submit Pengajuan</CardTitle>
            <CardDescription>
              Silahkan isi form dibawah ini untuk mengajukan pengetahuan baru.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RequestKnowledgeForm
              idKnowledge={params.idKnowledge}
              requestUuid={knowledge.data.created_by}
              supervisors={supervisors.data}
              baseUrl="/pemateri-divisi/knowledge/"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
