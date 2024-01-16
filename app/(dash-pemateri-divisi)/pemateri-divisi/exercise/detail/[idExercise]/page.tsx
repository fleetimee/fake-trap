import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { Variants } from "framer-motion"

import { authOptions } from "@/lib/auth"
import {
  getLinkedCourse,
  getOneQuiz,
  getQuizUserCount,
} from "@/lib/fetcher/exercise-fetcher"
import { getReference } from "@/lib/fetcher/reference-fetcher"
import { getCurrentUser } from "@/lib/session"
import { extractToken } from "@/lib/utils"
import {
  QuizAnswerPromptCard,
  QuizCalendarCard,
  QuizDescriptionCard,
  QuizLinkedCard,
  QuizTypeCard,
  QuizUserCountCard,
} from "@/components/app/quiz/detail/ui"
import { MotionDiv } from "@/components/framer-wrapper"

interface ExerciseDetailPageProps {
  params: {
    idExercise: string
  }
}

export async function generateMetadata({
  params,
}: ExerciseDetailPageProps): Promise<Metadata> {
  const user = await getCurrentUser()

  const exercise = await getOneQuiz({
    token: user?.token,
    id: params.idExercise,
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

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const [exercise, exerciseUserCount, exerciseType, exerciseLinked] =
    await Promise.all([
      getOneQuiz({
        token: user?.token,
        id: params.idExercise,
      }),
      getQuizUserCount({
        token: user?.token,
        idExercise: params.idExercise,
      }),
      getReference({
        refCode: "002",
        token: user?.token,
      }),
      getLinkedCourse({
        token: user?.token,
        idExercise: params.idExercise,
      }),
    ])

  const isAlreadyHaveQuestion = !!exercise?.data?.questions
  const userCount = exerciseUserCount?.data?.count

  const parentVariant: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const childrenVariant: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        bounce: 0.25,
        duration: 0.5,
        type: "spring",
        stiffness: 500,
      },
    },
  }

  if (
    exercise.code === 400 ||
    exercise.data.created_by !== tokenExtracted?.id
  ) {
    return notFound()
  }

  return (
    <MotionDiv
      className="space-y-4"
      initial="initial"
      animate="animate"
      variants={parentVariant}
    >
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <MotionDiv className="child" variants={childrenVariant}>
          <QuizAnswerPromptCard isAlreadyAnswered={isAlreadyHaveQuestion} />
        </MotionDiv>
        <MotionDiv className="child" variants={childrenVariant}>
          <QuizUserCountCard userCount={userCount} />
        </MotionDiv>
        <MotionDiv className="child" variants={childrenVariant}>
          <QuizTypeCard
            detailQuizType={exerciseType}
            detailQuizData={exercise}
          />
        </MotionDiv>
      </div>
      <MotionDiv className="child grid grid-cols-1" variants={childrenVariant}>
        <QuizLinkedCard code={exerciseLinked.code} data={exerciseLinked.data} />
      </MotionDiv>
      <div className="grid grid-flow-row gap-4 md:grid-cols-1 lg:grid-cols-2">
        <MotionDiv className="child" variants={childrenVariant}>
          <QuizDescriptionCard data={exercise.data} />
        </MotionDiv>
        <MotionDiv className="child" variants={childrenVariant}>
          <QuizCalendarCard data={exercise.data} />
        </MotionDiv>
      </div>
      <MotionDiv />
    </MotionDiv>
  )
}
