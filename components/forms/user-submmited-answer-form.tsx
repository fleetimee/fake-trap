"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { QuizOneRes, QuizOneResQuestion } from "@/types/quiz/res"
import { userSubmittedAnswerSchema } from "@/lib/validations/user-submitted-answer"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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

interface UserSubmittedAnswerFormProps {
  question: QuizOneResQuestion[]
  quiz: QuizOneRes
}

type Inputs = z.infer<typeof userSubmittedAnswerSchema>

export function UserSubmittedAnswerFormProps({
  question,
  quiz,
}: UserSubmittedAnswerFormProps) {
  const { data: session } = useSession()

  const [isPending, startTransition] = React.useTransition()

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(userSubmittedAnswerSchema),
    defaultValues: {
      uuid: session?.expires?.id,
      id_quiz: quiz?.data?.id_quiz,
      selected_answers: {},
    },
  })

  async function onSubmit(values: Inputs) {
    startTransition(async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/user-answer`

        const res = await fetch(url, {
          method: "POST",
          headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(values),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description: "Jawaban berhasil disimpan",
          })

          router.back()
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
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 gap-12"
        >
          <Card className="flex flex-col items-start justify-between gap-6 p-6">
            <h1 className="text-2xl font-semibold">{`${quiz.data.quiz_title}`}</h1>

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
                              className="grid grid-cols-2 gap-4 xl:grid-cols-2"
                              // value={field.value.toString()}
                              onValueChange={(value) => {
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
          </Card>

          <div className="grid grid-cols-1 items-center justify-between gap-6 py-2 xl:grid-cols-2">
            <Button type="submit" className="w-fit" disabled={isPending}>
              {isPending && <Icons.spinner className="animate-spin" />}
              Kirim Jawaban
            </Button>

            <Button
              type="reset"
              className="w-fit"
              disabled={isPending}
              variant="outline"
              onClick={() => {
                // clear form values first
                form.reset()

                // trigger reset manually
                form.trigger()

                // reset form state
                form.reset()
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
