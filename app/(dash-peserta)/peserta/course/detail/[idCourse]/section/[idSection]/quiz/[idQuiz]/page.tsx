import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import BronzeMedal from "@/public/images/bronzeMedal.png"
import GoldMedal from "@/public/images/goldMedal.png"
import SilverMedal from "@/public/images/silverMedal.png"
import Learn from "@/public/lottie/learning.json"
import QuizEnabled from "@/public/lottie/quiz_enabled.json"
import TrophyLess from "@/public/lottie/trophy-less.json"
import { generateFromString } from "generate-avatar"
import { CalendarDays, PrinterIcon } from "lucide-react"

import { authOptions } from "@/lib/auth"
import { CourseAvailability, QuizType } from "@/lib/enums/status"
import { getOneCourse } from "@/lib/fetcher/course-fetcher"
import {
  getOneQuiz,
  getQuizLeaderboard,
  getUserQuizResults,
} from "@/lib/fetcher/exercise-fetcher"
import { getReference } from "@/lib/fetcher/reference-fetcher"
import { getUserLeaderboard } from "@/lib/fetcher/users-fetcher"
import { getCurrentUser } from "@/lib/session"
import {
  cn,
  convertDateToShortString,
  convertDatetoString,
  convertDatetoStringWithTime,
  extractToken,
  getCourseStatus,
} from "@/lib/utils"
import Confetti from "@/components/confetti"
import { Icons } from "@/components/icons"
import { LottieClient } from "@/components/lottie-anim"
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const winnerQoutes = [
  "Victory is yours!",
  "You are Elden Lord!",
  "Champion of the Tarnished!",
  "Glory to the victor!",
  "You've conquered the Lands Between.",
  "Triumph over darkness!",
  "Your legend is forged!",
  "You have risen above all!",
  "The Elden Ring is restored!",
  "Your journey is complete!",
]

const loserQoutes = [
  "Embrace the unknown, for only in darkness can you find the light.",
  "Every step forward, no matter how small, brings you closer to your destiny.",
  "In the face of adversity, a true Tarnished never falters.",
  "Strength is not just in the sword, but in the resolve to keep fighting.",
  "Rise, for even in defeat, there is honor and wisdom to be gained.",
  "The journey may be perilous, but the flame of hope must never be extinguished.",
  "Forge your own path, for the Elden Ring awaits those with unwavering will.",
  "From ashes we rise, stronger and more determined than before.",
  "In the crucible of struggle, true greatness is born.",
  "Let your spirit be unyielding, for the trials ahead are but tests of your courage.",
]

interface CourseQuizPageProps {
  params: {
    idCourse: string
    idSection: string
    idQuiz: string
  }
}

export default async function CourseQuizPage({ params }: CourseQuizPageProps) {
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

  const userQuiz = await getUserQuizResults({
    token: user?.token,
    idUser: tokenExtracted.id,
    limit: 10,
    page: 1,
    idQuiz: params.idQuiz,
  })

  const course = await getOneCourse({
    token: user?.token,
    idCourse: params.idCourse,
  })

  const courseStatus = getCourseStatus({
    dateEnd: course.data.date_end,
    dateStart: course.data.date_start,
  })

  const getLeaderboad = await getQuizLeaderboard({
    token: user?.token,
    idExercise: params.idQuiz,
    limit: 10,
    page: 1,
  })

  const getCurrentUserPlacement = await getUserLeaderboard({
    token: user?.token,
    idQuiz: params.idQuiz,
    userUuid: tokenExtracted.id,
  })

  if (courseStatus !== CourseAvailability.ACTIVE) {
    return notFound()
  }

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

  const minutes = quiz.data.time_limit / 60

  const percentageScore = (userScore / maximumScore) * 100

  const getRandomQuote = (quotes: string | any[]) =>
    quotes[Math.floor(Math.random() * quotes.length)]

  const winnerQuote = getRandomQuote(winnerQoutes)
  const loserQuote = getRandomQuote(loserQoutes)

  if (quiz.code === 400) {
    return notFound()
  }

  return (
    <Card className="w-full rounded-none border-none border-background shadow-none">
      <div className="pointer-events-none fixed inset-0 z-50">
        <Confetti
          isActive={
            getCurrentUserPlacement.data >= 1 &&
            getCurrentUserPlacement.data <= 10
          }
          duration={5000}
        />
      </div>
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
            <p className="ml-4 text-sm ">Waktu: {Math.floor(minutes)} Menit</p>
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
            <TabsTrigger value="placement" className="w-full">
              Leaderboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcement" className="w-full space-y-6">
            <p className="flex items-center justify-center p-4 font-heading text-4xl">
              {quizType?.value_ref1}
            </p>

            <div className="flex items-center justify-center py-2">
              {isPretestExceded || isPosttestExceded ? (
                <LottieClient animationData={Learn} className="size-1/2" />
              ) : (
                <LottieClient
                  animationData={QuizEnabled}
                  className="size-1/2"
                />
              )}
            </div>

            <div className="p-4">
              <h2 className="mb-2 text-lg font-bold">
                Silahkan baca informasi berikut sebelum memulai Pembelajaran:
              </h2>
              <ul className="list-inside list-disc space-y-1 pl-5">
                <li className="text-sm">
                  Waktu mengerjakan ujian hanya {quiz.data.time_limit / 60}{" "}
                  menit
                </li>

                <li className="text-sm">
                  Ujian hanya dapat di kerjakan sekali untuk tipe Pre Test
                </li>
                <li className="text-sm">
                  Ujian dapat di kerjakan 3 kali untuk tipe Post Test dan
                  diambil nilai terbaik
                </li>
              </ul>
            </div>

            <div className="p-4">
              <h2 className="mb-2 text-lg font-bold">
                Status Pengerjaan Ujian anda:
              </h2>

              <ul className="list-inside list-disc space-y-1 pl-5">
                <li className="text-sm">
                  Tipe Ujian ini merupakan{" "}
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
                <p className="text-red-600">
                  ANDA SUDAH MELEBIHI LIMIT KESEMPATAN
                </p>
              ) : (
                <p className="text-green-500">ANDA DAPAT MEMULAI UJIAN</p>
              )}
            </h1>

            <AlertDialog>
              <AlertDialogTrigger
                className="flex w-full items-center justify-center"
                disabled={isPretestExceded || isPosttestExceded}
              >
                <Button
                  className="mt-4 w-full"
                  variant={
                    isPretestExceded || isPosttestExceded
                      ? "destructive"
                      : "default"
                  }
                  disabled={isPretestExceded || isPosttestExceded}
                >
                  Mulai Ujian
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Yakin Mulai ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Setelah Ujian di mulai, tidak dapat di ulang
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>

                  <AlertDialogAction asChild>
                    <Link
                      href={`
                /peserta/course/detail/${params.idCourse}/section/${params.idSection}/quiz/${params.idQuiz}/start
              `}
                      scroll={false}
                    >
                      Lanjut
                    </Link>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TabsContent>

          <TabsContent value="nilai" className="w-full space-y-6">
            {userQuiz.data.length > 0 ? (
              <Table className="relative">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nilai</TableHead>
                    <TableHead>Selesai Pada</TableHead>
                    <TableHead>Report</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userQuiz.data.map((result) => (
                    <TableRow key={result.id_attempt}>
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
                          <PrinterIcon className="size-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 overflow-auto rounded-lg border border-gray-200 py-4 dark:border-gray-800">
                <h1 className="flex max-w-md items-center py-2 text-center font-heading ">
                  Nilai anda belum tersedia, kerjakan soal terlebih dahulu
                </h1>

                <div className="flex items-center justify-center py-0">
                  <LottieClient
                    animationData={TrophyLess}
                    className="size-1/2"
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="placement"
            className="grid w-full grid-cols-1 space-y-6 md:grid-cols-1"
          >
            <Card className="w-full max-w-3xl space-y-4">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl">Posisi Anda</CardTitle>

                <CardDescription>
                  Ini adalah ranking anda di leaderboard
                </CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                {getCurrentUserPlacement.data > 0 ? (
                  <div>
                    <h1 className="py-2 text-center text-xl">
                      Kamu berada di posisi
                    </h1>

                    <p className="text-center text-4xl font-bold">
                      #
                      {getCurrentUserPlacement.data > 0
                        ? `${getCurrentUserPlacement.data}${getCurrentUserPlacement.data === 1 ? "st" : getCurrentUserPlacement.data === 2 ? "nd" : getCurrentUserPlacement.data === 3 ? "rd" : "th"}`
                        : "-"}
                    </p>

                    <p className="my-4 rounded-lg  px-6 py-2 text-center font-serif text-sm italic">
                      {getCurrentUserPlacement.data <= 3
                        ? winnerQuote
                        : loserQuote}
                    </p>

                    <div className="flex items-center justify-center py-0">
                      {getCurrentUserPlacement.data === 1 && (
                        // <LottieClient
                        //   animationData={GoldTrophy}
                        //   className="size-1/2"
                        // />

                        <Image
                          src={GoldMedal}
                          alt="Gold Medal"
                          width={400}
                          height={400}
                        />
                      )}
                      {getCurrentUserPlacement.data === 2 && (
                        <Image
                          src={SilverMedal}
                          alt="Silver Medal"
                          width={400}
                          height={400}
                        />
                      )}
                      {getCurrentUserPlacement.data === 3 && (
                        <Image
                          src={BronzeMedal}
                          alt="Bronze Medal"
                          width={400}
                          height={400}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4 overflow-auto rounded-lg border border-gray-200 dark:border-gray-800">
                    <h1 className="flex max-w-md items-center py-2 text-center font-heading ">
                      Kerjakan Soalnya terlebih dahulu, agar kamu dapat melihat
                      posisi kamu di leaderboard
                    </h1>

                    <div className="flex items-center justify-center py-0">
                      <LottieClient
                        animationData={TrophyLess}
                        className="size-1/2"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="w-full max-w-3xl space-y-4">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl">Leaderboard</CardTitle>

                <CardDescription>
                  Ini merupakan peringkat keseluruhan peserta yang mengerjakan
                  ujian disortir berdasarkan nilai tertinggi dan waktu tercepat
                  bila nilai sama dan waktu sama akan ada tiebreaker berdasarkan
                  waktu awal mengerjakan ujian
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-auto rounded-lg border border-gray-200 dark:border-gray-800">
                  <table className="w-full min-w-full">
                    <thead className="bg-gray-50 dark:bg-background">
                      <tr className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <th className="px-4 py-3 text-left">Position</th>

                        <th className="w-[200px] px-4 py-3 text-left">
                          Participant
                        </th>
                        <th className="px-4 py-3 text-right">Score</th>
                        <th className="px-4 py-3 text-right">Time</th>
                      </tr>
                    </thead>

                    <tbody className="bg-gray-50 dark:bg-background">
                      {getLeaderboad.data.length > 0 ? (
                        getLeaderboad.data.map((leaderboard, index) => (
                          <tr
                            className={cn(
                              "bg-gray-50 dark:bg-background",
                              leaderboard.user_uuid === tokenExtracted.id &&
                                "bg-blue-200 dark:bg-blue-700"
                            )}
                            key={leaderboard.position}
                          >
                            <td className="p-4 text-left">
                              {leaderboard.position === 1 ? (
                                <div className="inline-flex items-center justify-between space-x-2">
                                  <Icons.crown className="h-6 w-6 text-gold" />
                                  <span className="font-bold text-gold">{`${leaderboard.position}st`}</span>
                                </div>
                              ) : leaderboard.position === 2 ? (
                                <div className="inline-flex items-center justify-between space-x-2">
                                  <Icons.crown className="h-6 w-6 text-silver" />
                                  <span className="font-semibold text-silver">{`${leaderboard.position}nd`}</span>
                                </div>
                              ) : leaderboard.position === 3 ? (
                                <div className="inline-flex items-center justify-between space-x-2">
                                  <Icons.crown className="h-6 w-6 text-bronze" />
                                  <span className="font-medium text-bronze">{`${leaderboard.position}rd`}</span>
                                </div>
                              ) : (
                                `${leaderboard.position}th`
                              )}
                            </td>
                            <td className="p-4">
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <Button
                                    className="rounded-lg"
                                    variant="ghost"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className="relative size-10 overflow-hidden rounded-full bg-white">
                                        <Image
                                          src={
                                            leaderboard.profile_picture
                                              ? `${process.env.NEXT_PUBLIC_BASE_URL}${leaderboard.profile_picture}`
                                              : `data:image/svg+xml;utf8,${generateFromString(leaderboard.name)}`
                                          }
                                          alt="User name"
                                          width={200}
                                          height={200}
                                        />
                                      </div>
                                      <span
                                        className={`font-medium ${leaderboard.position === 1 ? "font-extrabold text-gold" : leaderboard.position === 2 ? "font-semibold text-silver" : leaderboard.position === 3 ? "font-medium text-bronze" : ""}`}
                                      >
                                        {leaderboard.name}
                                      </span>
                                    </div>
                                  </Button>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                  <div className="flex justify-between space-x-4">
                                    <div className="space-y-1">
                                      <h4 className="text-sm font-semibold">
                                        {leaderboard.name}
                                      </h4>
                                      <p className="text-sm">
                                        Waktu paling awal mengerjakan test ini :
                                      </p>
                                      <div className="flex items-center pt-2">
                                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                        <span className="text-xs text-muted-foreground">
                                          {convertDateToShortString(
                                            leaderboard.earliest_created_at
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            </td>
                            <td className="p-4 text-right">
                              {leaderboard.score}
                            </td>
                            <td className="p-4 text-right">
                              {leaderboard.time_elapsed}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="p-4 text-center">
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
