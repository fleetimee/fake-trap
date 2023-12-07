import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneSection } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { UpdateSectionForm } from "@/components/forms/update-knowledge-section-form"
import { Separator } from "@/components/ui/separator"

interface CourseSectionUpdatePageProps {
  params: {
    idCourse: string
    idSection: string
  }
}

export default async function CourseSectionUpdatePage({
  params,
}: CourseSectionUpdatePageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const section = await getOneSection({
    token: user.token,
    idSection: params.idSection,
  })

  if (section.code === 400) {
    return notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Section / Bagian</h3>
        <p className="text-sm text-muted-foreground">
          Perbarui nama section atau bagian untuk pengetahuan yang anda miliki.
        </p>
      </div>
      <Separator />
      <UpdateSectionForm
        idSection={Number(params.idSection)}
        section={section.data}
      />
    </div>
  )
}
