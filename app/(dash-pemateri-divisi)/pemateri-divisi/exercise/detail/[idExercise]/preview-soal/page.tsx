import { Metadata } from "next"
import { redirect } from "next/navigation"
import NotFoundLottie from "@/public/lottie/not-found.json"
import { Variants } from "framer-motion"
import { Info } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { getQuizLesson } from "@/lib/fetcher/exercise-fetcher"
import { getCurrentUser } from "@/lib/session"
import { DeleteQuestionButton } from "@/components/delete-question-button"
import { DeleteQuestions } from "@/components/delete-questions"
import { MotionDiv } from "@/components/framer-wrapper"
import { Icons } from "@/components/icons"
import { NotFoundAnim } from "@/components/not-found-anim"
import { DashboardShell } from "@/components/shell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

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
    <DashboardShell className="p-0">
      <div className="container space-y-6">
        <Alert className="bg-blue-50 dark:bg-blue-950">
          <Info className="h-4 w-4" />
          <AlertTitle>Preview Soal</AlertTitle>
          <AlertDescription>
            Berikut adalah tampilan soal yang sudah anda buat. Anda dapat
            menghapus soal jika diperlukan.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daftar Soal</CardTitle>
                <CardDescription>
                  Total {exerciseLesson?.data?.length || 0} Soal
                </CardDescription>
              </div>
              <DeleteQuestions idQuiz={Number(params.idExercise)} />
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-8 py-6">
            {exerciseLesson?.data?.length > 0 ? (
              exerciseLesson.data.map((item, index) => (
                <div
                  key={item.id_question}
                  id={`question-${item.id_question}`}
                  className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-950/50 md:p-6"
                >
                  <div className="flex justify-between">
                    <div className="space-y-2">
                      <span className="font-heading text-lg font-semibold tracking-tight text-blue-800 dark:text-blue-200 md:text-xl">
                        Pertanyaan {index + 1}
                      </span>
                      <p className="font-serif text-base text-slate-700 dark:text-slate-200 md:text-lg">
                        {item.question_text}
                      </p>
                    </div>
                    <DeleteQuestionButton
                      idQuestion={item.id_question}
                      token={user?.token}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 md:gap-4">
                    {item?.answers?.map((answer) => (
                      <div
                        key={answer.id_answer}
                        className={`
                          relative flex items-center space-x-4 rounded-lg border p-4
                          ${
                            answer.is_correct
                              ? "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-950"
                              : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                          }
                        `}
                      >
                        <RadioGroup
                          value={
                            answer.is_correct
                              ? answer.id_answer.toString()
                              : undefined
                          }
                          disabled
                        >
                          <div className="relative flex h-5 w-5 items-center justify-center">
                            <RadioGroupItem
                              value={answer.id_answer.toString()}
                            />
                          </div>
                        </RadioGroup>
                        <Label className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200 md:text-base">
                          {answer.answer_text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <NotFoundAnim
                animationData={NotFoundLottie}
                title="Belum ada soal"
                description="Soal belum ada atau belum dibuat"
                backButtonUrl={`/pemateri-divisi/exercise/detail/${params.idExercise}/soal`}
                buttonLabel="Buat Soal"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
