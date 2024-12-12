import { Metadata } from "next"
import Image from "next/image"
import { notFound, redirect } from "next/navigation"
import { FileTextIcon, PersonIcon } from "@radix-ui/react-icons" // Add this import
import { BookOpenIcon } from "lucide-react"

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

      <div className="container mx-auto space-y-8 p-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
              <div className="flex items-center gap-3">
                <BookOpenIcon className="h-6 w-6" />
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Detail Materi
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Informasi lengkap materi yang akan diajukan
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="divide-y divide-gray-100 p-6">
              <div className="space-y-6 pb-6">
                <PreviewItem
                  icon={<FileTextIcon className="h-4 w-4 text-blue-500" />}
                  label="Judul Materi"
                  value={knowledge.data.knowledge_title}
                />
                <PreviewItem
                  icon={<FileTextIcon className="h-4 w-4 text-blue-500" />}
                  label="Deskripsi"
                  value={knowledge.data.description}
                />
              </div>

              <div className="pt-6">
                <Label className="flex items-center gap-2 font-bold">
                  <FileTextIcon className="h-4 w-4 text-blue-500" />
                  Preview Gambar
                </Label>
                <div className="mt-3 overflow-hidden rounded-lg">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.data.image}`}
                    alt={knowledge.data.knowledge_title}
                    width={300}
                    height={300}
                    className="w-full object-cover transition-all duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-400 text-white">
              <div className="flex items-center gap-3">
                <PersonIcon className="h-6 w-6" />
                <div>
                  <CardTitle className="text-2xl font-bold">
                    Form Pengajuan
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    Silakan lengkapi form pengajuan materi
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <RequestKnowledgeForm
                idKnowledge={params.idKnowledge}
                requestUuid={knowledge.data.created_by}
                supervisors={supervisors.data}
                baseUrl="/pemateri-divisi/knowledge/"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

// Add PreviewItem component at the bottom
function PreviewItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-2 text-sm font-semibold text-gray-600">
        {icon}
        {label}
      </Label>
      <div className="ml-6 text-gray-900">{value}</div>
    </div>
  )
}
