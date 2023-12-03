import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneSection } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { Separator } from "@/components/ui/separator"

interface CourseQuizMultipleChoicePageProps {
  params: {
    idCourse: string
    idSection: string
  }
}

export default async function ({ params }: CourseQuizMultipleChoicePageProps) {
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
        <h3 className="text-lg font-medium">Quiz Pilihan Ganda</h3>
        <p className="text-sm text-muted-foreground">
          Tambahkan quiz pilihan ganda untuk section{" "}
          {section.data.section_title}
        </p>
      </div>
      <Separator />
    </div>
  )
}
