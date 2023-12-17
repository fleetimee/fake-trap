import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneSection, getQuizListWithNullSection } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import { AddQuizMultipleChoiceQuiz } from "@/components/forms/add-quiz-multiple"
import { Separator } from "@/components/ui/separator"

interface CourseQuizMultipleChoicePageProps {
  params: {
    idCourse: string
    idSection: string
  }
}

export default async function CourseQuizMultipleChoicePage({
  params,
}: CourseQuizMultipleChoicePageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const section = await getOneSection({
    token: user.token,
    idSection: params.idSection,
  })

  const quizNull = await getQuizListWithNullSection({
    token: user.token,
    isNull: true,
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

      <AddQuizMultipleChoiceQuiz
        idSection={Number(params.idSection)}
        quizList={quizNull.data}
      />
    </div>
  )
}
