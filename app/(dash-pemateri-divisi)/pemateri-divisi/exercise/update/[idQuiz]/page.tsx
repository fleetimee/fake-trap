import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneQuiz, getReference } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import { UpdateTestForm } from "@/components/forms/update-test-form"
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
  title: "Update Test dan Latihan",
  description: "Update Test dan Latihan",
}

interface PemateriDivisiExercisePageUpdateProps {
  params: {
    idQuiz: string
  }
}

export default async function PemateriDivisiExercisePageUpdate({
  params,
}: PemateriDivisiExercisePageUpdateProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const quiz = await getOneQuiz({
    id: params.idQuiz,
    token: user?.token,
  })

  const reference = await getReference({
    refCode: "002",
    token: user?.token,
  })

  if (quiz.code === 400 || quiz.data.created_by !== tokenExtracted.id) {
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
            href: "/pemateri-divisi/exercise",
            title: "Test dan Latihan",
          },
          {
            href: `/pemateri-divisi/exercise/update/${params.idQuiz}`,
            title: "Update Test dan Latihan",
          },
        ]}
      />

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle>
            Update Tes:{" "}
            <span className="font-semibold">{quiz.data?.quiz_title}</span>
          </CardTitle>
          <CardDescription>
            Update Tes yang sudah dibuat sebelumnya
          </CardDescription>
        </CardHeader>

        <CardContent>
          <UpdateTestForm quiz={quiz.data} references={reference} />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
