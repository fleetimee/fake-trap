"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { QuizOneRes, QuizOneResQuestion } from "@/types/quiz/res"
import { createUserAnswer } from "@/lib/fetcher/users-submission-fetcher"
import { userSubmittedAnswerSchema } from "@/lib/validations/user-submitted-answer"
import { EmptyContent } from "@/components/empty"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

  const [timeRemaining, setTimeRemaining] = useState(quiz?.data?.time_limit)

  const [startTime, setStartTime] = useState<Date | null>(null)

  // Flag all question as unanswered defaulted to 0
  const initialAnswers = question.reduce((acc, curr) => {
    // @ts-ignore
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

  const onSubmit = useCallback(
    async (values: Inputs) => {
      if (startTime) {
        const endTime = new Date()
        const elapsedTime = Math.round(
          (endTime.getTime() - startTime.getTime()) / 1000
        ) // in seconds
        const hours = Math.floor(elapsedTime / 3600)
        const minutes = Math.floor((elapsedTime % 3600) / 60)
        const seconds = elapsedTime % 60
        values.time_elapsed = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      }

      startTransition(async () => {
        try {
          const res = await createUserAnswer({
            token: session?.user?.token,
            body: JSON.stringify(values),
          })

          if (res.ok) {
            sonnerToast.success("Berhasil", {
              description: "Jawaban berhasil disimpan",
            })

            router.back()
            router.refresh()
            form.reset()
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
    [startTime, session?.user?.token, router, form]
  )

  useEffect(() => {
    setStartTime(new Date())
  }, [])

  useEffect(() => {
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timerId)
    } else {
      form.handleSubmit(onSubmit)()
    }
  }, [timeRemaining, form, onSubmit])

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
    <div>
      <Card className="w-full ">
        <CardHeader>
          <CardTitle>{quiz.data.quiz_title}</CardTitle>
          <CardDescription>{quiz.data.quiz_desc}</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-8 py-6">
          <div className="flex items-end justify-end">
            <div className="flex flex-col gap-2">
              {/* <p className="ml-4 text-sm ">Butir Soal: {questionLength} Soal</p>
            <p className="ml-4 text-sm ">Dibuat Pada: {formattedDate}</p> */}
              <p className="ml-4 text-sm ">
                Waktu: {Math.floor(timeRemaining / 60)} Menit{" "}
                {timeRemaining % 60} Detik
              </p>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-1 gap-12"
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
                      control={form.control}
                      name={`selected_answers.${question.id_question}`}
                      render={({ field }) => (
                        <div className="">
                          <FormItem className="flex flex-col gap-4">
                            <FormLabel className="font-heading">
                              {question.question_text}
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                key={key}
                                disabled={isPending || isPreviewOnly}
                                className="grid grid-cols-2 gap-4 xl:grid-cols-2"
                                value={field.value.toString()}
                                onValueChange={(value) => {
                                  // const confirmBox = window.confirm(
                                  //   "Are you sure you want to select this answer?"
                                  // )
                                  // if (confirmBox === true) {
                                  //   form.setValue(
                                  //     `selected_answers.${question.id_question}`,
                                  //     parseInt(value)
                                  //   )
                                  // }

                                  form.setValue(
                                    `selected_answers.${question.id_question}`,
                                    parseInt(value)
                                  )
                                }}
                              >
                                {question.answers.map((answer, index) => (
                                  <FormItem
                                    key={index}
                                    className="flex items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <RadioGroupItem
                                        value={answer.id_answer.toString()}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal leading-8">
                                      {answer.answer_text}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>

                          <hr className="my-4 w-full border-gray-300" />
                        </div>
                      )}
                    />
                  ))
                : null}

              <div className="grid grid-cols-1 items-center justify-between gap-6 py-2 xl:grid-cols-2">
                <Button type="submit" disabled={isPending || isPreviewOnly}>
                  {isPending && <Icons.spinner className="animate-spin" />}
                  Kirim Jawaban
                </Button>

                <Button
                  type="reset"
                  disabled={isPending || isPreviewOnly}
                  variant="outline"
                  onClick={() => {
                    setKey((prev) => prev + 1)

                    sonnerToast.info("Reset", {
                      description: "Jawaban berhasil direset",
                    })
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
