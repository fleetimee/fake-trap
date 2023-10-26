import { redirect } from "next/navigation"

import { CourseOneRes } from "@/types/course/res"
import { QuizOneRes } from "@/types/quiz/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

import { QuizForm } from "./_components/quiz_form"

interface GetOneQuizProps {
  token: string | undefined
  idQuiz: string
}

async function getOneQuiz({
  token,
  idQuiz,
}: GetOneQuizProps): Promise<QuizOneRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${idQuiz}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }
  )

  return await res.json()
}

interface GetOneCourseProps {
  token: string | undefined
  idCourse: number
}

async function getOneCourse({
  token,
  idCourse,
}: GetOneCourseProps): Promise<CourseOneRes> {
  const courseOne = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${idCourse}`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )
  return await courseOne.json()
}

interface CoursePreviewQuizProps {
  params: {
    idCourse: string
    quiz: string
  }
}

export default async function CoursePreviewQuiz({
  params,
}: CoursePreviewQuizProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [coursePreview, quiz] = await Promise.all([
    getOneCourse({ token: user.token, idCourse: Number(params.idCourse) }),
    getOneQuiz({ token: user.token, idQuiz: params.quiz }),
  ])

  console.log(quiz)

  return <QuizForm question={quiz.data.questions} quiz={quiz} />
}