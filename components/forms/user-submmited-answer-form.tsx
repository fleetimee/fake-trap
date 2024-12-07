"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Info, RefreshCcw } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import useFormPersist from "react-hook-form-persist"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { QuizOneRes, QuizOneResQuestion } from "@/types/quiz/res"
import { createUserAnswer } from "@/lib/fetcher/users-submission-fetcher"
import { userSubmittedAnswerSchema } from "@/lib/validations/user-submitted-answer"
import { EmptyContent } from "@/components/empty"
import { Icons } from "@/components/icons"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface UserSubmittedAnswerFormProps {
  question: QuizOneResQuestion[]
  quiz: QuizOneRes
  baseUrl: string
  isPreviewOnly?: boolean
}

type Inputs = z.infer<typeof userSubmittedAnswerSchema>

export function UserSubmittedAnswerForm({
  question,
  quiz,
  baseUrl,
  isPreviewOnly = false,
}: UserSubmittedAnswerFormProps) {
  const { data: session } = useSession()
  const [key, setKey] = useState(0)

  const [isPending, startTransition] = React.useTransition()

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [startTime, setStartTime] = useState<Date | null>(null)

  const [isSubmitted, setIsSubmitted] = useState(false)

  // Add this state
  const [shouldPersist, setShouldPersist] = useState(true)

  // Add this state to track auto-submission
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false)

  // Add this function to check if a question is answered
  const isQuestionAnswered = (questionId: number) => {
    const answers = form.getValues("selected_answers")
    return answers && answers[questionId] !== 0
  }

  // Add this to track current question in view
  const [activeQuestion, setActiveQuestion] = useState<number>(0)

  // Add intersection observer to track which question is in view
  useEffect(() => {
    const observers = question.map((q, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveQuestion(index)
            }
          })
        },
        { threshold: 0.5 }
      )

      const element = document.getElementById(`question-${q.id_question}`)
      if (element) observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [question])

  if (!question) {
    throw new Error("Ujian ini belum memiliki soal")
  }

  const persistedState =
    typeof window !== "undefined"
      ? window.localStorage.getItem(`quizStorage-${quiz.data.id_quiz}`)
      : null

  const initialAnswers = persistedState
    ? JSON.parse(persistedState).selected_answers
    : question.reduce<Record<number, number>>((acc, curr) => {
        acc[curr.id_question] = 0
        return acc
      }, {})

  const router = useRouter()

  const form = useForm<Inputs>({
    defaultValues: {
      uuid: session?.expires?.id,
      id_quiz: quiz?.data?.id_quiz,
      selected_answers: initialAnswers,
    },
  })

  useFormPersist(`quizStorage-${quiz.data.id_quiz}`, {
    watch: form.watch,
    setValue: form.setValue,
    storage:
      typeof window !== "undefined" && shouldPersist
        ? window.localStorage
        : undefined, // default window.sessionStorage
    exclude: ["baz"],
  })

  const onSubmit = useCallback(
    async (values: Inputs) => {
      // Set a default value for time_elapsed
      values.time_elapsed = "00:00:00"

      console.log(startTime)

      if (startTime) {
        const endTime = new Date()
        const elapsedTime = Math.round(
          (endTime.getTime() - startTime.getTime()) / 1000
        ) // in seconds
        const hours = Math.floor(elapsedTime / 3600)
        const minutes = Math.floor((elapsedTime % 3600) / 60)
        const seconds = elapsedTime % 60
        values.time_elapsed = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      }

      setIsSubmitted(true)

      startTransition(async () => {
        try {
          const res = await createUserAnswer({
            token: session?.user?.token,
            body: JSON.stringify(values),
          })

          if (res.ok) {
            // Disable persistence before clearing storage
            setShouldPersist(false)

            sonnerToast.success("Berhasil", {
              description: "Jawaban berhasil disimpan",
            })

            // Clear the saved start time and remaining time from the local storage
            localStorage.removeItem(`startTime`)
            localStorage.removeItem(`startTime-${quiz.data.id_quiz}`)
            localStorage.removeItem(`timeRemaining-${quiz.data.id_quiz}`)

            // Clear the quizStorage

            // Reset the form fields to their initial values
            form.reset()

            localStorage.removeItem(`quizStorage-${quiz.data.id_quiz}`)

            router.back()
            router.refresh()

            setIsSubmitted(false)
          } else {
            const errorResponse: ErrorResponse = await res.json()

            sonnerToast.error("Gagal", {
              description: errorResponse?.error,
            })
          }
        } catch (error) {
          sonnerToast.error("Gagal", {
            description: `${error}`,
          })
        }
      })
    },
    [
      startTime,
      session?.user?.token,
      quiz.data.id_quiz,
      form,
      router,
      setShouldPersist,
    ]
  )

  useEffect(() => {
    const savedStartTime = localStorage.getItem(
      `startTime-${quiz.data.id_quiz}`
    )
    const savedTimeRemaining = localStorage.getItem(
      `timeRemaining-${quiz.data.id_quiz}`
    )

    if (savedStartTime && savedTimeRemaining) {
      const startTimeDate = new Date(savedStartTime)
      const now = new Date()
      const elapsedSeconds = Math.floor(
        (now.getTime() - startTimeDate.getTime()) / 1000
      )
      const remainingTime = Math.max(quiz.data.time_limit - elapsedSeconds, 0)

      setStartTime(startTimeDate)
      setTimeRemaining(remainingTime)
    } else {
      // First time loading or no saved state
      const newStartTime = new Date()
      setStartTime(newStartTime)
      setTimeRemaining(quiz.data.time_limit)

      localStorage.setItem(
        `startTime-${quiz.data.id_quiz}`,
        newStartTime.toISOString()
      )
      localStorage.setItem(
        `timeRemaining-${quiz.data.id_quiz}`,
        quiz.data.time_limit.toString()
      )
    }
  }, [quiz.data.id_quiz, quiz.data.time_limit])

  // Modify the timer effect to have better checks
  useEffect(() => {
    // Don't do anything until timeRemaining is properly initialized
    if (timeRemaining === null) return

    if (timeRemaining <= 0) {
      if (!isSubmitted && !isAutoSubmitting) {
        setIsAutoSubmitting(true)
        sonnerToast.warning("Waktu Habis!", {
          description: "Jawaban akan otomatis dikumpulkan",
        })

        setTimeout(() => {
          form.handleSubmit(onSubmit)()
        }, 1000)
      }
      return
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (!prev || prev <= 0) {
          clearInterval(interval)
          return 0
        }
        const newTimeRemaining = prev - 1
        localStorage.setItem(
          `timeRemaining-${quiz.data.id_quiz}`,
          newTimeRemaining.toString()
        )
        return newTimeRemaining
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [
    timeRemaining,
    quiz.data.id_quiz,
    isSubmitted,
    isAutoSubmitting,
    form,
    onSubmit,
  ])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue =
        "You have unsaved changes, are you sure you want to leave?"
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  const [openResetDialog, setOpenResetDialog] = useState(false)

  const handleReset = () => {
    const emptyAnswers = question.reduce<Record<number, number>>(
      (acc, curr) => {
        acc[curr.id_question] = 0
        return acc
      },
      {}
    )

    form.reset({
      ...form.getValues(),
      selected_answers: emptyAnswers,
    })

    setKey((prev) => prev + 1)
    setOpenResetDialog(false)
    sonnerToast.info("Reset", {
      description: "Jawaban berhasil direset",
    })
  }

  if (!quiz.data.questions) {
    return (
      <EmptyContent className="h-[50px]">
        <EmptyContent.Icon name="warning" />
        <EmptyContent.Title>Oops</EmptyContent.Title>
        <EmptyContent.Description>
          Belum ada soal untuk Tes ini silahkan tambahkan soal terlebih dahulu
        </EmptyContent.Description>

        {isPreviewOnly ? (
          <Link
            href={`${baseUrl}exercise/detail/${quiz.data.id_quiz}/soal`}
            className={buttonVariants({
              size: "sm",
              className:
                "mt-4 w-full bg-blue-500 text-center text-white hover:bg-blue-600",
            })}
          >
            Tambah Soal
          </Link>
        ) : null}
      </EmptyContent>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 md:px-6">
      <Alert className="bg-blue-50 dark:bg-blue-950">
        <Info className="h-4 w-4" />
        <AlertTitle>Informasi Penting</AlertTitle>
        <AlertDescription>
          Harap baca setiap pertanyaan dengan teliti. Pastikan semua jawaban
          terisi sebelum mengirim. Waktu akan berjalan dan jawaban akan otomatis
          terkumpul ketika waktu habis.
        </AlertDescription>
      </Alert>

      {/* Progress Tracker Card */}
      <div className="fixed right-2 z-50 hidden md:bottom-[18rem] md:right-2 md:block">
        <Card className="w-[100px] overflow-hidden border-blue-100 bg-blue-50/80 backdrop-blur-sm dark:border-blue-900 dark:bg-blue-950/80 lg:w-[280px]">
          <CardHeader className="border-b border-blue-100 bg-blue-100/50 p-2 dark:border-blue-800 dark:bg-blue-900/50 lg:p-4">
            <CardTitle className="text-[10px] font-semibold text-blue-900 dark:text-blue-100 lg:text-sm">
              Progress Soal
            </CardTitle>
          </CardHeader>
          <CardContent className="p-1.5 lg:p-4">
            <ScrollArea className="h-[140px] pr-1 lg:h-[200px] lg:pr-3">
              <div className="grid grid-cols-4 gap-1 p-0.5 lg:grid-cols-5 lg:gap-2">
                {question.map((q, index) => (
                  <button
                    key={q.id_question}
                    onClick={() => {
                      document
                        .getElementById(`question-${q.id_question}`)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`
                      group relative h-6 w-6 rounded text-[10px] font-medium transition-all hover:scale-105 lg:h-9 lg:w-9 lg:rounded-md lg:text-xs
                      ${
                        isQuestionAnswered(q.id_question)
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-white text-blue-900 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                      }
                      ${
                        activeQuestion === index
                          ? "ring-1 ring-blue-400 ring-offset-1 ring-offset-blue-50 dark:ring-offset-blue-950"
                          : ""
                      }
                    `}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      {index + 1}
                    </span>
                    {index >= 99 && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-blue-900 px-1 py-0.5 text-[8px] text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-blue-700 lg:-top-6 lg:text-[10px]">
                        Soal {index + 1}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-1.5 flex items-center justify-between border-t border-blue-100 pt-1.5 text-[10px] font-medium text-blue-800 dark:border-blue-800 dark:text-blue-200 lg:mt-3 lg:pt-3 lg:text-xs">
              <span className="flex items-center gap-1">
                <span className="flex h-1 w-1 rounded-full bg-blue-500 lg:h-1.5 lg:w-1.5"></span>
                <span>
                  {
                    question.filter((q) => isQuestionAnswered(q.id_question))
                      .length
                  }
                  /{question.length}
                </span>
              </span>
              <span>Terjawab</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timer Card */}
      <div className="fixed bottom-4 right-4 z-50 md:bottom-24 md:right-4">
        <Card className="w-[140px] border-blue-100 bg-blue-50/80 backdrop-blur-sm dark:border-blue-900 dark:bg-blue-950/80 md:w-[220px]">
          <CardHeader className="border-b border-blue-100 bg-blue-100/50 p-3 dark:border-blue-800 dark:bg-blue-900/50 md:p-6">
            <CardTitle className="text-sm font-semibold text-blue-900 dark:text-blue-100 md:text-base">
              Waktu Tersisa
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-6">
            <div className="text-center text-2xl font-bold md:text-4xl">
              <span className="text-blue-700 dark:text-blue-300">
                {timeRemaining ? Math.floor(timeRemaining / 60) : 0}:
              </span>
              <span className="text-blue-900 dark:text-blue-100">
                {timeRemaining
                  ? (timeRemaining % 60).toString().padStart(2, "0")
                  : "00"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>{quiz.data.quiz_title}</CardTitle>
          <CardDescription>{quiz.data.quiz_desc}</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-8 py-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-1 gap-8 md:gap-12"
            >
              <FormField
                control={form.control}
                name="id_quiz"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4">
                    <FormControl>
                      <Input {...field} type="hidden" className="rounded-md" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {question
                ? question.map((question, index) => (
                    <FormField
                      key={question.id_question}
                      control={form.control}
                      name={`selected_answers.${question.id_question}`}
                      render={({ field }) => (
                        <div
                          id={`question-${question.id_question}`} // Add this id for scrolling
                          className="rounded-lg bg-blue-50/50 p-4 dark:bg-blue-950/50 md:p-6"
                        >
                          <FormItem className="flex flex-col gap-4">
                            <FormLabel className="space-y-2">
                              <span className="font-heading text-lg font-semibold tracking-tight text-blue-800 dark:text-blue-200 md:text-xl">
                                Pertanyaan {index + 1}
                              </span>
                              <p className="font-serif text-base text-slate-700 dark:text-slate-200 md:text-lg">
                                {question.question_text}
                              </p>
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                key={key}
                                disabled={isPending || isPreviewOnly}
                                className="grid grid-cols-1 gap-3 md:gap-4"
                                onValueChange={(value) => {
                                  form.setValue(
                                    `selected_answers.${question.id_question}`,
                                    parseInt(value)
                                  )
                                }}
                              >
                                {question.answers.map((answer, index) => (
                                  <label
                                    key={index}
                                    className={`
                                      relative flex cursor-pointer select-none items-center space-x-4 rounded-lg 
                                      border p-4 transition-all duration-200 ease-in-out
                                      ${
                                        field.value === answer.id_answer
                                          ? "border-blue-500 bg-blue-50 shadow-sm dark:border-blue-400 dark:bg-blue-950"
                                          : "border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-800 dark:hover:bg-blue-950/50"
                                      }
                                      ${isPending || isPreviewOnly ? "cursor-not-allowed opacity-60" : ""}
                                    `}
                                  >
                                    <FormControl>
                                      <div className="relative flex h-5 w-5 items-center justify-center">
                                        <RadioGroupItem
                                          value={answer.id_answer.toString()}
                                          className={`
                                            h-4 w-4 rounded border border-slate-300 text-blue-600 
                                            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 
                                            disabled:cursor-not-allowed disabled:opacity-50
                                            dark:border-slate-700 dark:text-blue-500 dark:focus:ring-blue-500 dark:focus:ring-offset-slate-950
                                            ${
                                              field.value === answer.id_answer
                                                ? "border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-500"
                                                : ""
                                            }
                                          `}
                                        />
                                        {field.value === answer.id_answer && (
                                          <svg
                                            className="absolute h-3 w-3 text-white dark:text-slate-950"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <polyline points="20 6 9 17 4 12" />
                                          </svg>
                                        )}
                                      </div>
                                    </FormControl>
                                    <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200 md:text-base">
                                      {answer.answer_text}
                                    </span>
                                  </label>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </div>
                      )}
                    />
                  ))
                : null}

              <div className="grid grid-cols-1 items-center justify-between gap-4 py-2 md:grid-cols-2 md:gap-6">
                <Button
                  type="submit"
                  className={`relative w-full overflow-hidden transition-all duration-300
                    ${
                      isPending || isAutoSubmitting
                        ? "bg-blue-400 dark:bg-blue-600"
                        : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    }
                  `}
                  disabled={isPending || isPreviewOnly || isAutoSubmitting}
                >
                  {(isPending || isAutoSubmitting) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-500/50 backdrop-blur-sm dark:bg-blue-600/50">
                      <Icons.spinner className="h-5 w-5 animate-spin text-white" />
                    </div>
                  )}
                  <span
                    className={
                      isPending || isAutoSubmitting ? "opacity-50" : ""
                    }
                  >
                    {isAutoSubmitting ? "Mengumpulkan..." : "Kirim Jawaban"}
                  </span>
                </Button>

                <Dialog
                  open={openResetDialog}
                  onOpenChange={setOpenResetDialog}
                >
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-blue-200 text-blue-600 transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:border-blue-700 dark:hover:bg-blue-900/50"
                      disabled={isPending || isPreviewOnly}
                    >
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      Reset Jawaban
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Reset Jawaban</DialogTitle>
                      <DialogDescription>
                        Apakah anda yakin ingin mereset semua jawaban? Tindakan
                        ini tidak dapat dibatalkan.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpenResetDialog(false)}
                      >
                        Batal
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={handleReset}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Reset
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
