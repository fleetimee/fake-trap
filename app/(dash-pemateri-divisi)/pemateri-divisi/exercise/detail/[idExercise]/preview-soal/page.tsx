import { Metadata } from "next"
import { redirect } from "next/navigation"
import NotFoundLottie from "@/public/lottie/not-found.json"
import { Variants } from "framer-motion"

import { authOptions } from "@/lib/auth"
import { getQuizLesson } from "@/lib/fetcher/exercise-fetcher"
import { getCurrentUser } from "@/lib/session"
import { DeleteQuestions } from "@/components/delete-questions"
import { MotionDiv } from "@/components/framer-wrapper"
import { NotFoundAnim } from "@/components/not-found-anim"
import { DashboardShell } from "@/components/shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const metadata: Metadata = {
  title: "Preview Soal",
  description: "Preview Soal",
}

interface ExerciseDetailQuestionPreviewProps {
  params: {
    idExercise: string
  }
}

export default async function ExerciseDetailQuestionPreview({
  params,
}: ExerciseDetailQuestionPreviewProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const exerciseLesson = await getQuizLesson({
    token: user?.token,
    idExercise: params.idExercise,
  })

  const parentVariants: Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  }

  const childVariants: Variants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <DashboardShell>
      <Card className="min-h-[40rem] p-2">
        <MotionDiv
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.2,
              stiffness: 100,
              damping: 20,
              bounceDamping: 10,
            },
          }}
          className="grid grid-cols-2 justify-between gap-6"
        >
          <CardHeader className="flex justify-between">
            <CardTitle className="font-heading">Preview Soal</CardTitle>
            <CardDescription>
              Berikut adalah tampilan soal yang sudah anda buat
            </CardDescription>
          </CardHeader>

          <DeleteQuestions idQuiz={Number(params.idExercise)} />
        </MotionDiv>
        <MotionDiv
          variants={parentVariants}
          initial="initial"
          animate="animate"
        >
          {exerciseLesson?.data?.length > 0 ? (
            exerciseLesson.data.map((item, index) => {
              return (
                <MotionDiv
                  key={item.id_question}
                  className="child flex flex-col items-start justify-between gap-6 p-6"
                  variants={childVariants}
                >
                  <p className="font-heading leading-8 ">
                    {index + 1}. {item.question_text}
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    {item?.answers?.map((answer) => {
                      return (
                        <RadioGroup
                          key={answer.id_answer}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <RadioGroupItem
                            checked={answer.is_correct}
                            value={answer.id_answer.toString()}
                            disabled
                          />
                          <Label>{answer.answer_text}</Label>
                        </RadioGroup>
                      )
                    })}
                  </div>
                </MotionDiv>
              )
            })
          ) : (
            <NotFoundAnim
              animationData={NotFoundLottie}
              title="Belum ada soal"
              description="Soal belum ada atau belum dibuat"
              backButtonUrl={`/pemateri-divisi/exercise/detail/${params.idExercise}/soal`}
              buttonLabel="Buat Soal"
            />
          )}
        </MotionDiv>
      </Card>
    </DashboardShell>
  )
}
