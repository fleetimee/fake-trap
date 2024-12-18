import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneQuiz } from "@/lib/fetcher/exercise-fetcher"
import { getReference } from "@/lib/fetcher/reference-fetcher"
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
  title: "Update Ujian",
  description: "Update Ujian",
}

interface OperatorLMSExercisePageUpdateProps {
  params: {
    idQuiz: string
  }
}

export default async function OperatorLMSExercisePageUpdate({
  params,
}: OperatorLMSExercisePageUpdateProps) {
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

  if (quiz.code === 400) {
    return notFound()
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/operator-lms",
            title: "Operator LMS",
          },
          {
            href: "/operator-lms/exercise",
            title: "Ujian",
          },
          {
            href: `/operator-lms/exercise/update/${params.idQuiz}`,
            title: "Update Ujian",
          },
          {
            href: `/operator-lms/exercise/update/${params.idQuiz}`,
            title: quiz.data?.quiz_title,
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
          <UpdateTestForm
            quiz={quiz.data}
            references={reference}
            userId={tokenExtracted.id}
          />
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
