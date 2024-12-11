import Image from "next/image"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import BronzeMedal from "@/public/images/bronzeMedal.png"
import GoldMedal from "@/public/images/goldMedal.png"
import SilverMedal from "@/public/images/silverMedal.png"
import Learn from "@/public/lottie/learning.json"
import Lock from "@/public/lottie/lock.json"
import QuizEnabled from "@/public/lottie/quiz_enabled.json"
import TrophyLess from "@/public/lottie/trophy-less.json"
import { generateFromString } from "generate-avatar"
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  Info,
  List,
  Play,
  PrinterIcon,
  Type,
  Users,
  X,
} from "lucide-react"

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
  convertDateToStringSimplified,
  convertDatetoStringWithTime,
  extractToken,
  getCourseStatus,
} from "@/lib/utils"
import { Icons } from "@/components/icons"
import { LottieClient } from "@/components/lottie-anim"
import NumberTicker from "@/components/number-ticker"
import { PrintButton } from "@/components/print-button"
import SparklesText from "@/components/sparkle-text"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area"
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

import { PrintButtonNilai } from "./PrintButton"

const winnerQuotes = [
  "Selamat atas pencapaian Anda!",
  "Prestasi yang luar biasa!",
  "Anda telah menunjukkan kemampuan terbaik!",
  "Keberhasilan yang membanggakan!",
  "Pencapaian yang sangat mengesankan!",
  "Hasil yang memuaskan!",
  "Prestasi gemilang!",
  "Kerja keras Anda membuahkan hasil!",
  "Pencapaian yang patut dirayakan!",
  "Kesuksesan yang membanggakan!",
]

const loserQuotes = [
  "Terus semangat, ini baru permulaan!",
  "Setiap kegagalan adalah langkah menuju kesuksesan.",
  "Jangan menyerah, cobalah lagi!",
  "Belajar dari pengalaman ini untuk hasil yang lebih baik.",
  "Tetap optimis, kesempatan berikutnya pasti ada.",
  "Jadikan ini sebagai motivasi untuk lebih baik.",
  "Kegagalan adalah guru terbaik dalam hidup.",
  "Terus berusaha dan tingkatkan kemampuan Anda.",
  "Setiap usaha tidak akan sia-sia.",
  "Percaya pada kemampuan diri sendiri.",
]
interface CourseQuizPageProps {
  params: {
    idCourse: string
    idSection: string
    idQuiz: string
  }
}

function getOrdinalIndicator(number: number) {
  const j = number % 10,
    k = number % 100
  if (j === 1 && k !== 11) {
    return "st"
  }
  if (j === 2 && k !== 12) {
    return "nd"
  }
  if (j === 3 && k !== 13) {
    return "rd"
  }
  return "th"
}

const getStatusConfig = (
  isQuizOpen: boolean,
  isPretestExceded: boolean,
  isPosttestExceded: boolean
) => {
  if (!isQuizOpen) {
    return {
      color: "bg-yellow-100 dark:bg-yellow-900",
      textColor: "text-yellow-800 dark:text-yellow-100",
      icon: <Icons.lock className="mr-2 size-4" />,
      message: "Ujian Terkunci",
      remark: "Mohon tunggu hingga waktu ujian dimulai",
    }
  }

  if (isPretestExceded || isPosttestExceded) {
    return {
      color: "bg-red-100 dark:bg-red-900",
      textColor: "text-red-800 dark:text-red-100",
      icon: <AlertTriangle className="mr-2 size-4" />,
      message: "Kesempatan Habis",
      remark: "Anda telah menggunakan semua kesempatan yang tersedia",
    }
  }

  return {
    color: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-800 dark:text-green-100",
    icon: <Icons.check className="mr-2 size-4" />,
    message: "Ujian Dapat Dimulai",
    remark: "Silakan mulai ujian sekarang",
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
    limit: 999,
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

  const now = new Date()
  const timeOpen = new Date(quiz.data.jam_buka)
  const timeClose = new Date(quiz.data.jam_tutup)

  const isQuizOpen = now >= timeOpen && now <= timeClose

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

  const winnerQuote = getRandomQuote(winnerQuotes)
  const loserQuote = getRandomQuote(loserQuotes)

  if (quiz.code === 400) {
    return notFound()
  }

  return (
    <Card className="w-full rounded-none border-none border-background shadow-none">
      <CardHeader>
        <CardTitle>{quiz.data.quiz_title}</CardTitle>
        <CardDescription>{quiz.data.quiz_desc}</CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-8 py-6">
        <Tabs defaultValue="announcement" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-3 gap-4 rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
            <TabsTrigger
              value="announcement"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100"
            >
              <div className="flex items-center space-x-2">
                <Info className="size-4" />
                <span>Informasi</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="nilai"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100"
            >
              <div className="flex items-center space-x-2">
                <Activity className="size-4" />
                <span>Riwayat Nilai</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="placement"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-100"
            >
              <div className="flex items-center space-x-2">
                <Icons.crown className="size-4" />
                <span>Peringkat</span>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="announcement"
            className="rounded-lg border border-blue-100 bg-white p-6 shadow-lg dark:border-blue-800 dark:bg-background"
          >
            <div className="flex flex-col space-y-1.5 text-center">
              <h3 className="font-heading text-3xl font-semibold tracking-tight">
                {quizType?.value_ref1}
              </h3>
            </div>

            <div className="flex items-center justify-center py-8">
              <div className="relative flex flex-col items-center justify-center">
                <div className="mb-4">
                  <LottieClient
                    animationData={
                      isQuizOpen
                        ? isPretestExceded || isPosttestExceded
                          ? Learn
                          : QuizEnabled
                        : Lock
                    }
                    className="size-72"
                  />
                </div>
                {(() => {
                  const status = getStatusConfig(
                    isQuizOpen,
                    isPretestExceded,
                    isPosttestExceded
                  )
                  return (
                    <div className="absolute bottom-0 flex flex-col items-center gap-2 text-center">
                      <span
                        className={`inline-flex items-center rounded-full ${status.color} ${status.textColor} px-6 py-2.5 text-sm font-semibold`}
                      >
                        {status.icon}
                        {status.message}
                      </span>
                      <p className={`text-xs italic ${status.textColor}`}>
                        {status.remark}
                      </p>
                    </div>
                  )
                })()}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="mb-4 font-heading text-xl font-semibold">
                  Informasi Penting
                </h2>
                <div className="space-y-6">
                  <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-950/50">
                    <h3 className="mb-2 font-semibold">Ketentuan Waktu</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <List className="mr-2 size-4" />
                        Jumlah Soal: {questionLength} Soal
                      </li>
                      <li className="flex items-center">
                        <Icons.clock className="mr-2 size-4" />
                        Durasi ujian: {quiz.data.time_limit / 60} menit
                      </li>
                      <li className="flex items-center">
                        <Icons.calendar className="mr-2 size-4" />
                        Jam Buka:{" "}
                        {convertDateToStringSimplified(
                          quiz.data.jam_buka.toString()
                        )}
                      </li>
                      <li className="flex items-center">
                        <Icons.calendar className="mr-2 size-4" />
                        Jam Tutup:{" "}
                        {convertDateToStringSimplified(
                          quiz.data.jam_tutup.toString()
                        )}
                      </li>
                      <li className="flex items-center">
                        <Icons.calendar className="mr-2 size-4" />
                        Dibuat Pada: {formattedDate}
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-950/50">
                    <h3 className="mb-2 font-semibold">Ketentuan Pengerjaan</h3>
                    <ul className="list-inside list-disc space-y-2 text-sm">
                      <li className="flex items-center">
                        <Info className="mr-2 size-4" />
                        Ujian Pre-Test hanya dapat dikerjakan satu kali
                      </li>
                      <li className="flex items-center">
                        <Info className="mr-2 size-4" />
                        Ujian Post-Test dapat dikerjakan maksimal tiga kali
                      </li>
                      <li className="flex items-center">
                        <Info className="mr-2 size-4" />
                        Nilai tertinggi akan diambil sebagai nilai akhir
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-950/50">
                    <h3 className="mb-2 font-semibold">Status Pengerjaan</h3>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center">
                        <Type className="mr-2 size-4" />
                        Tipe Ujian:{" "}
                        <span className="ml-1 font-semibold">
                          {quizType?.value_ref1}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <Icons.check className="mr-2 size-4" />
                        Kesempatan Tersisa:{" "}
                        <span className="ml-1 font-semibold">
                          {isPretest ? 1 : 3} kali
                        </span>
                      </p>
                      <p className="flex items-center">
                        <Activity className="mr-2 size-4" />
                        Sudah Dikerjakan:{" "}
                        <span className="ml-1 font-semibold">
                          {userQuiz.data ? userQuiz.data.length : 0} kali
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h1 className="mb-4 text-2xl font-bold">
                  {!isQuizOpen ? (
                    <span className="inline-flex items-center rounded-lg bg-yellow-100 px-6 py-3 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                      <Icons.lock className="mr-2 size-5" />
                      BELUM SAATNYA MEMULAI UJIAN
                    </span>
                  ) : isPretestExceded || isPosttestExceded ? (
                    <span className="inline-flex items-center rounded-lg bg-red-100 px-6 py-3 text-red-800 dark:bg-red-900 dark:text-red-100">
                      <AlertTriangle className="mr-2 size-5" />
                      ANDA SUDAH MELEBIHI LIMIT KESEMPATAN
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-lg bg-green-100 px-6 py-3 text-green-800 dark:bg-green-900 dark:text-green-100">
                      <Icons.check className="mr-2 size-5" />
                      ANDA DAPAT MEMULAI UJIAN
                    </span>
                  )}
                </h1>

                <AlertDialog>
                  <AlertDialogTrigger
                    className="w-full max-w-md"
                    disabled={
                      !isQuizOpen || isPretestExceded || isPosttestExceded
                    }
                  >
                    <Button
                      className="w-full"
                      size="lg"
                      variant={
                        !isQuizOpen || isPretestExceded || isPosttestExceded
                          ? "destructive"
                          : "default"
                      }
                      disabled={
                        !isQuizOpen || isPretestExceded || isPosttestExceded
                      }
                    >
                      {!isQuizOpen ? (
                        <Icons.lock className="mr-2 size-4" />
                      ) : isPretestExceded || isPosttestExceded ? (
                        <X className="mr-2 size-4" />
                      ) : (
                        <Play className="mr-2 size-4" />
                      )}
                      Mulai Ujian
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Siap Memulai?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Setelah ujian dimulai, Anda tidak dapat mengulang
                        kembali
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
                          Mulai
                        </Link>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="nilai"
            className="rounded-lg border border-blue-100 bg-white p-6 shadow-lg dark:border-blue-800 dark:bg-background"
          >
            {userQuiz.data.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Riwayat Nilai</h2>
                    <p className="text-sm text-muted-foreground">
                      Berikut adalah riwayat nilai dari ujian yang telah Anda
                      kerjakan
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {userQuiz.data.map((result, index) => (
                    <div
                      key={result.id_attempt}
                      className="group relative rounded-lg border p-4 transition-all hover:border-blue-200 hover:shadow-md dark:hover:border-blue-800"
                    >
                      <div className="absolute right-4 top-4">
                        <PrintButtonNilai
                          url={`${process.env.NEXT_PUBLIC_BASE_URL}/export/test/${tokenExtracted.id}/${result.id_attempt}`}
                          quizTitle={quiz.data.quiz_title}
                          attemptNumber={index + 1}
                        />
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="flex size-12 items-center justify-center rounded-full bg-blue-100 font-semibold dark:bg-blue-900">
                          #{index + 1}
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Percobaan ke-{index + 1}
                          </p>
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold">
                              {result.score}
                              <span className="ml-1 text-sm font-normal text-muted-foreground">
                                / 100
                              </span>
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="size-4" />
                            {convertDatetoStringWithTime(
                              result.created_at.toString()
                            )}
                          </div>

                          {/* Score bar visualization */}
                          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900">
                            <div
                              className="h-full bg-blue-500 transition-all"
                              style={{ width: `${result.score}%` }}
                            />
                          </div>

                          <div className="mt-2 flex gap-2">
                            {result.score >= 80 ? (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                                <Icons.check className="mr-1 size-3" />
                                Sangat Baik
                              </span>
                            ) : result.score >= 60 ? (
                              <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                                <Info className="mr-1 size-3" />
                                Cukup Baik
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-100">
                                <AlertTriangle className="mr-1 size-3" />
                                Perlu Perbaikan
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
            className="space-y-6 rounded-lg border border-blue-100 bg-white p-6 shadow-lg dark:border-blue-800 dark:bg-background"
          >
            {/* Placement Card */}
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950 dark:to-background"></div>
              <CardHeader className="relative pb-0">
                <CardTitle className="text-xl">Posisi Anda</CardTitle>
                <CardDescription>
                  Ini adalah ranking anda di leaderboard
                </CardDescription>
              </CardHeader>
              <CardContent className="relative py-6">
                {getCurrentUserPlacement.data > 0 ? (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h1 className="text-xl text-muted-foreground">
                        Kamu berada di posisi
                      </h1>
                      <div className="mt-4 flex items-center justify-center space-x-2">
                        <span className="text-6xl font-bold">#</span>
                        <NumberTicker
                          value={getCurrentUserPlacement.data}
                          className="text-6xl font-bold"
                        />
                        <span className="text-3xl font-medium text-muted-foreground">
                          {getOrdinalIndicator(getCurrentUserPlacement.data)}
                        </span>
                      </div>
                    </div>

                    <SparklesText
                      text={
                        getCurrentUserPlacement.data <= 3
                          ? winnerQuote
                          : loserQuote
                      }
                      className="mx-auto max-w-lg rounded-lg bg-white/50 px-6 py-3 text-center font-serif text-sm italic shadow-sm backdrop-blur-sm dark:bg-background/50"
                    />

                    <div className="flex items-center justify-center">
                      {getCurrentUserPlacement.data === 1 && (
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

            {/* Leaderboard Card */}
            <Card>
              <CardHeader className="pb-0">
                <div className="flex flex-col space-y-1.5 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div>
                    <CardTitle className="text-xl">Leaderboard</CardTitle>
                    <CardDescription className="max-w-2xl">
                      Peringkat keseluruhan peserta berdasarkan nilai tertinggi
                      dan waktu tercepat
                    </CardDescription>
                  </div>
                  {getLeaderboad.data.length > 10 && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 sm:mt-0"
                        >
                          <Users className="mr-2 size-4" />
                          Lihat Semua ({getLeaderboad.data.length})
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[725px]">
                        <DialogHeader>
                          <DialogTitle>Daftar Peringkat Lengkap</DialogTitle>
                          <DialogDescription>
                            Peringkat seluruh peserta
                          </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[500px] w-full rounded-md border p-4">
                          <table className="w-full min-w-full">
                            <tbody>
                              {getLeaderboad.data.map((leaderboard) => (
                                <tr
                                  className={cn(
                                    "bg-gray-50 dark:bg-background",
                                    leaderboard.user_uuid ===
                                      tokenExtracted.id &&
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
                                  <td className="px-1.5 py-1.5 sm:px-3 sm:py-2.5">
                                    <HoverCard>
                                      <HoverCardTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          className="h-auto w-full justify-start p-1 hover:bg-transparent sm:p-2" // Added padding for better hover area
                                        >
                                          <div className="flex items-center gap-1.5 sm:gap-3">
                                            <div className="relative size-6 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-gray-100 dark:ring-gray-800 sm:size-16 sm:ring-2">
                                              <Image
                                                src={
                                                  leaderboard.profile_picture
                                                    ? `${process.env.NEXT_PUBLIC_BASE_URL}${leaderboard.profile_picture}`
                                                    : `data:image/svg+xml;utf8,${generateFromString(
                                                        leaderboard.name
                                                      )}`
                                                }
                                                alt={leaderboard.name}
                                                width={64}
                                                height={64}
                                                className="object-cover"
                                              />
                                            </div>
                                            <span
                                              className={cn(
                                                "max-w-[80px] truncate text-xs font-medium sm:max-w-[200px]", // Removed sm:text-lg to keep font small
                                                leaderboard.position === 1 &&
                                                  "font-bold text-gold",
                                                leaderboard.position === 2 &&
                                                  "font-semibold text-silver",
                                                leaderboard.position === 3 &&
                                                  "font-medium text-bronze"
                                              )}
                                            >
                                              {leaderboard.name}
                                            </span>
                                          </div>
                                        </Button>
                                      </HoverCardTrigger>
                                      <HoverCardContent
                                        className="w-80"
                                        side="right"
                                        align="start"
                                        sideOffset={5}
                                      >
                                        <div className="flex flex-col gap-4">
                                          <div className="flex items-center gap-4">
                                            <div className="relative size-24 overflow-hidden rounded-full border-2 border-muted">
                                              <Image
                                                src={
                                                  leaderboard.profile_picture
                                                    ? `${process.env.NEXT_PUBLIC_BASE_URL}${leaderboard.profile_picture}`
                                                    : `data:image/svg+xml;utf8,${generateFromString(leaderboard.name)}`
                                                }
                                                alt={leaderboard.name}
                                                fill
                                                className="aspect-square scale-150 object-cover object-top"
                                                style={{
                                                  objectPosition: "center 0%",
                                                  transform:
                                                    "scale(1.5) translateY(10%)",
                                                }}
                                              />
                                            </div>
                                            <div className="space-y-1">
                                              <h4 className="text-base font-semibold leading-none">
                                                {leaderboard.name}
                                              </h4>
                                              <p className="text-sm text-muted-foreground">
                                                Posisi #{leaderboard.position}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex flex-col gap-2 border-t pt-4">
                                            <div className="flex items-center gap-2">
                                              <CalendarDays className="size-4 text-muted-foreground" />
                                              <span className="text-sm text-muted-foreground">
                                                Mulai pada:
                                              </span>
                                            </div>
                                            <p className="text-sm font-medium">
                                              {convertDatetoStringWithTime(
                                                leaderboard.earliest_created_at
                                              )}
                                            </p>
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
                              ))}
                            </tbody>
                          </table>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="overflow-x-auto">
                    <table className="w-full divide-y divide-gray-200 dark:divide-gray-800">
                      <thead className="bg-gray-50 dark:bg-background">
                        <tr>
                          <th className="w-8 px-1.5 py-2 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 sm:w-20 sm:px-3 sm:py-2.5 sm:text-xs">
                            #
                          </th>
                          <th className="w-[120px] px-1.5 py-2 text-left text-[10px] font-semibold text-gray-500 dark:text-gray-400 sm:w-[250px] sm:px-3 sm:py-2.5 sm:text-xs">
                            Peserta
                          </th>
                          <th className="w-10 px-1.5 py-2 text-right text-[10px] font-semibold text-gray-500 dark:text-gray-400 sm:w-20 sm:px-3 sm:py-2.5 sm:text-xs">
                            Nilai
                          </th>
                          <th className="w-12 px-1.5 py-2 text-right text-[10px] font-semibold text-gray-500 dark:text-gray-400 sm:w-24 sm:px-3 sm:py-2.5 sm:text-xs">
                            Waktu
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-background">
                        {getLeaderboad.data.length > 0 ? (
                          getLeaderboad.data.slice(0, 10).map((leaderboard) => (
                            <tr
                              key={leaderboard.position}
                              className={cn(
                                "transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50",
                                leaderboard.user_uuid === tokenExtracted.id &&
                                  "bg-blue-50 dark:bg-blue-900/50"
                              )}
                            >
                              <td className="whitespace-nowrap px-1.5 py-1.5 sm:px-3 sm:py-2.5">
                                {leaderboard.position <= 3 ? (
                                  <div className="flex items-center gap-0.5 sm:gap-1">
                                    <Icons.crown
                                      className={cn(
                                        "size-3 sm:size-4",
                                        leaderboard.position === 1 &&
                                          "text-gold",
                                        leaderboard.position === 2 &&
                                          "text-silver",
                                        leaderboard.position === 3 &&
                                          "text-bronze"
                                      )}
                                    />
                                    <span
                                      className={cn(
                                        "text-xs font-semibold sm:text-sm",
                                        leaderboard.position === 1 &&
                                          "text-gold",
                                        leaderboard.position === 2 &&
                                          "text-silver",
                                        leaderboard.position === 3 &&
                                          "text-bronze"
                                      )}
                                    >
                                      {leaderboard.position}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-muted-foreground sm:text-sm">
                                    {leaderboard.position}
                                  </span>
                                )}
                              </td>
                              <td className="px-1.5 py-1.5 sm:px-3 sm:py-2.5">
                                <HoverCard>
                                  <HoverCardTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      className="h-auto w-full justify-start p-1 hover:bg-transparent sm:p-2" // Added padding for better hover area
                                    >
                                      <div className="flex items-center gap-1.5 sm:gap-3">
                                        <div className="relative size-6 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-gray-100 dark:ring-gray-800 sm:size-16 sm:ring-2">
                                          <Image
                                            src={
                                              leaderboard.profile_picture
                                                ? `${process.env.NEXT_PUBLIC_BASE_URL}${leaderboard.profile_picture}`
                                                : `data:image/svg+xml;utf8,${generateFromString(
                                                    leaderboard.name
                                                  )}`
                                            }
                                            alt={leaderboard.name}
                                            width={64}
                                            height={64}
                                            className="object-cover"
                                          />
                                        </div>
                                        <span
                                          className={cn(
                                            "max-w-[80px] truncate text-xs font-medium sm:max-w-[200px]", // Removed sm:text-lg to keep font small
                                            leaderboard.position === 1 &&
                                              "font-bold text-gold",
                                            leaderboard.position === 2 &&
                                              "font-semibold text-silver",
                                            leaderboard.position === 3 &&
                                              "font-medium text-bronze"
                                          )}
                                        >
                                          {leaderboard.name}
                                        </span>
                                      </div>
                                    </Button>
                                  </HoverCardTrigger>
                                  <HoverCardContent
                                    className="w-80"
                                    side="right"
                                    align="start"
                                    sideOffset={5}
                                  >
                                    <div className="flex flex-col gap-4">
                                      <div className="flex items-center gap-4">
                                        <div className="relative size-24 overflow-hidden rounded-full border-2 border-muted">
                                          <Image
                                            src={
                                              leaderboard.profile_picture
                                                ? `${process.env.NEXT_PUBLIC_BASE_URL}${leaderboard.profile_picture}`
                                                : `data:image/svg+xml;utf8,${generateFromString(leaderboard.name)}`
                                            }
                                            alt={leaderboard.name}
                                            fill
                                            className="aspect-square scale-150 object-cover object-top"
                                            style={{
                                              objectPosition: "center 0%",
                                              transform:
                                                "scale(1.5) translateY(10%)",
                                            }}
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <h4 className="text-base font-semibold leading-none">
                                            {leaderboard.name}
                                          </h4>
                                          <p className="text-sm text-muted-foreground">
                                            Posisi #{leaderboard.position}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-2 border-t pt-4">
                                        <div className="flex items-center gap-2">
                                          <CalendarDays className="size-4 text-muted-foreground" />
                                          <span className="text-sm text-muted-foreground">
                                            Mulai pada:
                                          </span>
                                        </div>
                                        <p className="text-sm font-medium">
                                          {convertDatetoStringWithTime(
                                            leaderboard.earliest_created_at
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </HoverCardContent>
                                </HoverCard>
                              </td>
                              <td className="whitespace-nowrap px-1.5 py-1.5 text-right text-xs font-medium sm:px-3 sm:py-2.5 sm:text-sm">
                                {leaderboard.score}
                              </td>
                              <td className="whitespace-nowrap px-1.5 py-1.5 text-right text-[10px] text-muted-foreground sm:px-3 sm:py-2.5 sm:text-sm">
                                {leaderboard.time_elapsed}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={4}
                              className="px-3 py-8 text-center text-xs text-muted-foreground sm:text-sm"
                            >
                              Belum ada data leaderboard
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
