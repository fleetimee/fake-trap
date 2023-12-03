import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { SoalShell } from "@/components/app/quiz/soal/add-question-shell"





interface ExerciseDetailQuestionBuilderProps {
  params: {
    idExercise: string
  }
}

export const metadata: Metadata = {
  title: "Tambah Soal",
  description: "Tambah Soal",
}

export default async function ExerciseDetailQuestionBuilder({
  params,
}: ExerciseDetailQuestionBuilderProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <SoalShell idQuiz={params.idExercise} token={user?.token} />
    </div>
  )
}
