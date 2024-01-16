import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getQuizLesson } from "@/lib/fetcher/exercise-fetcher"
import { getOneUser, getUserAnswer } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import { PdfViewer } from "@/components/pdf-viewer"
import { PrintButton } from "@/components/print-button"
import { DashboardShell } from "@/components/shell"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Hasil Tes",
  description: "Hasil Tes",
}

interface ExerciseResultDetailPageProps {
  params: {
    idExercise: string
    idUser: string
  }
  searchParams: {
    idAttempt: string
  }
}

export default async function ExerciseResultDetailPage({
  params,
  searchParams,
}: ExerciseResultDetailPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const exerciseLesson = await getQuizLesson({
    idExercise: params.idExercise,
    token: user?.token,
  })

  const exerciseUserAnswer = await getUserAnswer({
    token: user?.token,
    idAttempt: searchParams.idAttempt,
    userUuid: params.idUser,
  })

  const person = await getOneUser({
    token: user?.token,
    uuid: params.idUser,
  })

  const correctAnswer =
    exerciseUserAnswer.data.filter((item) => item.is_correct).length ?? 0

  const totalQuestion = exerciseUserAnswer.data.length ?? 0

  return (
    <DashboardShell>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Laporan</TabsTrigger>
          <TabsTrigger value="password">Printout</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card className="flex flex-col gap-6">
            <CardHeader>
              <CardTitle>Hasil Tes</CardTitle>
              <CardDescription className="text-lg">
                Berikut adalah nilai tes yang telah peserta{" "}
                <span className="font-semibold">{person.data.name}</span>{" "}
                lakukan
              </CardDescription>

              <div className="flex justify-end">
                <Card className="max-w-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl font-semibold">
                        Ringkasan
                      </CardTitle>
                      <Badge className="bg-red-100 text-red-500 dark:bg-red-800">
                        Info
                      </Badge>
                    </div>
                    <CardDescription className="mt-2 text-gray-500 dark:text-gray-400">
                      Peserta {person.data.name} telah menyelesaikan tes ini
                      dengan jawaban benar sebanyak{" "}
                      <span className="text-lg font-semibold">
                        {correctAnswer}
                      </span>{" "}
                      dari{" "}
                      <span className="text-lg font-semibold">
                        {totalQuestion}
                      </span>{" "}
                      dan mendapatkan nilai{" "}
                      <span className="text-lg font-semibold">
                        {exerciseUserAnswer.data[0].score ?? 0}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold">Peserta</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          {person.data.name}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {exerciseLesson.data.map((item, index) => {
                const userAnswer = exerciseUserAnswer.data.filter(
                  (answer) => answer.id_question === item.id_question
                )

                return (
                  <div key={item.id_question} className="space-y-5">
                    <Label htmlFor="current">
                      {index + 1}. {item.question_text}
                    </Label>
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
                    <div className="flex justify-end space-x-3">
                      <div className="flex items-center space-x-2">
                        <Label>Benar ?</Label>
                        {userAnswer?.map((answer, index) => {
                          return (
                            <div
                              key={answer.id_answer}
                              className="flex flex-col"
                            >
                              <Badge
                                className={`${
                                  answer.is_correct
                                    ? "bg-green-100 text-green-500"
                                    : "bg-red-100 text-red-500"
                                }`}
                              >
                                {answer.is_correct ? "Benar" : "Salah"}
                              </Badge>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <Separator />
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader className="grid grid-cols-2 justify-between">
              <div>
                <CardTitle>Printout</CardTitle>
                <CardDescription className="text-lg">
                  Cetak hasil tes peserta{" "}
                  <span className="font-semibold">{person.data.name}</span>{" "}
                </CardDescription>
              </div>

              <div className="flex justify-end">
                <PrintButton
                  pdfUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${params.idUser}/${searchParams.idAttempt}`}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <PdfViewer
                link={`${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${params.idUser}/${searchParams.idAttempt}`}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
