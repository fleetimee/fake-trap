import { redirect } from "next/navigation"

import { QuizQuestionListRes } from "@/types/quiz/res"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { DashboardShell } from "@/components/shell"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export const metadata = {
  title: "Preview Soal",
  description: "Halaman untuk melihat preview soal",
}

interface GetQuizLessonProps {
  token: string | undefined
  quizId: string
}

async function getQuizLesson({
  token,
  quizId,
}: GetQuizLessonProps): Promise<QuizQuestionListRes> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${quizId}/getLesson`,
    {
      method: "GET",
      headers: {
        ContentType: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  )

  return await res.json()
}

interface PreviewSoalPageProps {
  params: {
    quizId: string
  }
}

export default async function PreviewSoalPage({
  params,
}: PreviewSoalPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const getQuizResp = await getQuizLesson({
    token: user?.token,
    quizId: params.quizId,
  })

  return (
    <DashboardShell>
      <Card className="min-h-[40rem] p-2">
        <CardHeader className="flex justify-between">
          <CardTitle className="font-heading">Preview Soal</CardTitle>
          <CardDescription>
            Berikut adalah tampilan soal yang sudah anda buat
          </CardDescription>
        </CardHeader>
        {getQuizResp?.data?.map((item, index) => {
          return (
            <div
              key={item.id_question}
              className="flex flex-col items-start justify-between gap-6 p-6"
            >
              <p className="font-heading leading-8 ">
                {index + 1}. {item.question_text}
              </p>

              <div className="grid grid-cols-2 gap-6">
                {item?.answers?.map((answer, index) => {
                  return (
                    <RadioGroup
                      key={answer.id_answer}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      {/*<input*/}
                      {/*  type="radio"*/}
                      {/*  name={`answer-${item.id_question}`}*/}
                      {/*  id={`answer-${item.id_question}-${index}`}*/}
                      {/*/>*/}

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
            </div>
          )
        })}
      </Card>
    </DashboardShell>
  )
}
