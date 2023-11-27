import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { AddSectionForm } from "@/components/forms/add-knowledge-section"
import { Separator } from "@/components/ui/separator"

interface KnowledgeSectionNewPageProps {
  params: {
    idKnowledge: string
  }
}

export default async function KnowledgeSectionNewPage({
  params,
}: KnowledgeSectionNewPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Section / Bagian</h3>
        <p className="text-sm text-muted-foreground">
          Tambah Section atau Bagian baru untuk pengetahuan yang anda miliki.
        </p>
      </div>
      <Separator />
      <AddSectionForm idKnowledge={Number(params.idKnowledge)} />
    </div>
  )
}
