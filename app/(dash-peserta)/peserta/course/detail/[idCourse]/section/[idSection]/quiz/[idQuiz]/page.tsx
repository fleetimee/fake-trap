import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { PrinterIcon } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { QuizType } from "@/lib/enums/status"
import { getNewExerciseResult, getOneQuiz, getReference } from "@/lib/fetcher"
import { getCurrentUser } from "@/lib/session"
import {
  convertDatetoString,
  convertDatetoStringShort,
  convertDatetoStringWithTime,
  extractToken,
} from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CourseQuizPageProps {
  params: {
    idCourse: string
    idSection: string
    idQuiz: string
  }
}

export default async function CourseQuizPageProps({
  params,
}: CourseQuizPageProps) {
  const user = await getCurrentUser()

  const tokenExtracted = extractToken(user?.token)

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const quiz = await getOneQuiz({
    token: user?.token,
    id: params.idQuiz,
  })

  const reference = await getReference({
    refCode: "002",
    token: user?.token,
  })

  const userQuiz = await getNewExerciseResult({
    token: user?.token,
    idUser: tokenExtracted.id,
    limit: 10,
    page: 1,
    idQuiz: params.idQuiz,
  })

  console.log(userQuiz)

  const isPretest = quiz.data.quiz_type === QuizType.PRETEST
  const isPosttest = quiz.data.quiz_type === QuizType.POSTTEST

  const isPretestExceded = userQuiz.data.length > 0 && isPretest
  const isPosttestExceded = userQuiz.data.length === 3 && isPosttest

  const formattedDate = convertDatetoString(quiz.data.created_at.toString())

  const questionLength = quiz.data.questions ? quiz.data.questions.length : 0
  const totalQuestions = quiz.data.questions ? questionLength : 0
  const maximumScore = totalQuestions * 10
  const userScore = 100

  const quizType = reference.data.find(
    (item) => item.code_ref2 === quiz.data.quiz_type
  )

  console.log(quizType?.value_ref1)

  const percentageScore = (userScore / maximumScore) * 100
  // if (isPretest && userQuiz.data.length > 0) {
  //   return (
  //     <p>
  //       Anda sudah mengerjakan pretest, silahkan lanjutkan ke materi selanjutnya
  //     </p>
  //   )
  // }

  // if (isPosttest && userQuiz.data.length === 3) {
  //   return (
  //     <p>
  //       Anda sudah mengerjakan posttest, silahkan lanjutkan ke materi
  //       selanjutnya
  //     </p>
  //   )
  // }

  if (quiz.code === 400) {
    return notFound()
  }

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>{quiz.data.quiz_title}</CardTitle>
        <CardDescription>{quiz.data.quiz_desc}</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-8 py-6">
        <div className="flex items-end justify-end">
          <div className="flex flex-col gap-2">
            <p className="ml-4 text-sm ">Butir Soal: {questionLength} Soal</p>
            <p className="ml-4 text-sm ">Dibuat Pada: {formattedDate}</p>
            <p className="ml-4 text-sm ">Waktu: 30 Menit</p>
          </div>
        </div>

        <Tabs defaultValue="announcement" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="announcement" className="w-full">
              Informasi
            </TabsTrigger>
            <TabsTrigger value="nilai" className="w-full">
              Riwayat Nilai
            </TabsTrigger>
          </TabsList>
          <TabsContent value="announcement" className="w-full space-y-6">
            <p className="flex items-center justify-center p-4 font-heading text-4xl">
              {quizType?.value_ref1}
            </p>
            <div className="flex items-center justify-center py-2">
              <div className="rounded-full border border-gray-300 p-8">
                <Icons.warning className="h-32 w-32 text-yellow-500" />
              </div>
            </div>
            <div className="p-4">
              <h2 className="mb-2 text-lg font-bold">
                Silahkan baca informasi berikut sebelum memulai Pelatihan:
              </h2>
              <ul className="list-inside list-disc space-y-1 pl-5">
                <li className="text-sm">Waktu Pelatihan hanya 30 menit</li>
                <li className="text-sm">
                  Pelatihan hanya dapat di kerjakan sekali untuk tipe PreTest
                </li>
                <li className="text-sm">
                  Quiz dapat di kerjakan 3 kali untuk tipe PostTest
                </li>
              </ul>
            </div>

            <div className="p-4">
              <h2 className="mb-2 text-lg font-bold">
                Status Pengerjaan Pelatihan anda:
              </h2>

              <ul className="list-inside list-disc space-y-1 pl-5">
                <li className="text-sm">
                  Tipe Pelatihan ini merupakan{" "}
                  <span className="font-bold italic underline">
                    {quizType?.value_ref1}
                  </span>
                  , berarti maksimal kesempatan menjawab adalah{" "}
                  <span className="font-bold">{isPretest ? 1 : 3}</span> kali
                </li>
                <li className="text-sm">
                  Anda sudah mengerjakan{" "}
                  <span className="font-bold">
                    {userQuiz.data ? userQuiz.data.length : 0}
                  </span>{" "}
                  kali dari {isPretest ? 1 : 3} kesempatan yang tersedia
                </li>
              </ul>
            </div>

            <h1 className="text-center text-2xl font-bold">
              {isPretestExceded || isPosttestExceded ? (
                <p className="text-red-600">STOP RIGHT THERE CRIMINAL SCUM</p>
              ) : (
                <p className="text-green-500">ANDA DAPAT MEMULAI PELATIHAN</p>
              )}
            </h1>

            <AlertDialog>
              <AlertDialogTrigger
                className="flex w-full items-center justify-center"
                disabled={isPretestExceded || isPosttestExceded}
              >
                <Button
                  className="mt-4 w-full"
                  variant="secondary"
                  disabled={isPretestExceded || isPosttestExceded}
                >
                  Mulai Quiz
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Yakin Mulai ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Setelah Quiz di mulai, tidak dapat di ulang
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>

                  <AlertDialogAction>
                    <Link
                      href={`
                /peserta/course/detail/${params.idCourse}/section/${params.idSection}/quiz/${params.idQuiz}/start
              `}
                    >
                      Lanjut
                    </Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TabsContent>
          <TabsContent value="nilai">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Pelatihan</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Nilai</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Report</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userQuiz.data.map((result) => (
                  <TableRow key={result.id_attempt}>
                    <TableCell>{result.quiz_title}</TableCell>
                    <TableCell>{result.status_text}</TableCell>
                    <TableCell>{result.score}</TableCell>
                    <TableCell>
                      {convertDatetoStringWithTime(
                        result.created_at.toString()
                      )}
                    </TableCell>
                    <TableCell>
                      <Link
                        target="_blank"
                        className={buttonVariants({
                          size: "icon",
                          className:
                            "mt-4 w-full bg-blue-500 text-center text-white hover:bg-blue-600",
                        })}
                        href={`
                ${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${tokenExtracted.id}/${result.id_attempt}
              `}
                      >
                        <PrinterIcon className="h-4 w-4" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
