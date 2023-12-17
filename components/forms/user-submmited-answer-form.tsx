"use client"

import React, { useCallback, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { QuizOneRes, QuizOneResQuestion } from "@/types/quiz/res"
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

export function UserSubmittedAnswerFormProps({
  question,
  quiz,
  baseUrl,
  isPreviewOnly = false,
}: UserSubmittedAnswerFormProps) {
  const { data: session } = useSession()
  const [key, setKey] = useState(0)

  const [isPending, startTransition] = React.useTransition()

  // const [timer, setTimer] = useState(5) // Set timer to 60 seconds or any desired time

  // useEffect(() => {
  //   let interval: NodeJS.Timeout

  //   if (timer > 0) {
  //     // Start the timer when the component mounts
  //     interval = setInterval(() => {
  //       setTimer((prevTimer) => prevTimer - 1)
  //     }, 1000)
  //   }

  //   // Clear the interval when the component unmounts or the timer reaches zero
  //   return () => clearInterval(interval)
  // }, [timer])

  // useEffect(() => {
  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     e.preventDefault()
  //     e.returnValue =
  //       "Are you sure you want to leave? Your progress will be lost."
  //   }

  //   window.addEventListener("beforeunload", handleBeforeUnload)

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload)
  //   }
  // }, [])

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(userSubmittedAnswerSchema),
    defaultValues: {
      uuid: session?.expires?.id,
      id_quiz: quiz?.data?.id_quiz,
      selected_answers: {},
    },
  })

  const onSubmit = useCallback(
    async (values: Inputs) => {
      startTransition(async () => {
        try {
          const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/user-answer`

          const res = await fetch(url, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session?.user?.token}`,
            },
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
    [startTransition, session, router, form]
  )

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
              <p className="ml-4 text-sm ">Waktu: 30 Menit</p>
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
                                // value={field.value.toString()}
                                onValueChange={(value) => {
                                  const confirmBox = window.confirm(
                                    "Are you sure you want to select this answer?"
                                  )
                                  if (confirmBox === true) {
                                    form.setValue(
                                      `selected_answers.${question.id_question}`,
                                      parseInt(value)
                                    )
                                  }
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
