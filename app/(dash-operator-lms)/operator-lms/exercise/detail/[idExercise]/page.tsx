import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getOneExercise } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"

interface ExerciseDetailPageProps {
  params: {
    idExercise: string
  }
}

export async function generateMetadata({
  params,
}: ExerciseDetailPageProps): Promise<Metadata> {
  const user = await getCurrentUser()

  const exercise = await getOneExercise({
    token: user?.token,
    idExercise: params.idExercise,
  })

  return {
    title: exercise?.data?.quiz_title,
    description: exercise?.data?.quiz_title,
    keywords: exercise?.data?.quiz_title,
  }
}

export default async function ExerciseDetailPage({
  params,
}: ExerciseDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const exercise = await getOneExercise({
    token: user?.token,
    idExercise: params.idExercise,
  })
}
