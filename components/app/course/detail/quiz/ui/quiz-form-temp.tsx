import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { CourseOneResQuiz } from "@/types/course/res"
import { QuestionListRes } from "@/types/question/res"
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
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  uuid: z.string().optional(),
  id_quiz: z.number().optional(),
  selected_answers: z.record(z.string(), z.number()).optional(),
})

interface QuizFormTempProps {
  questionResp: QuestionListRes
  contentQuiz: CourseOneResQuiz
  quizIdInitial: string
}

export function QuizFormTemp({
  questionResp,
  contentQuiz,
  quizIdInitial,
}: QuizFormTempProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uuid: session?.expires.id,
      id_quiz: contentQuiz.id_quiz,
      selected_answers: {},
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    console.log(values)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/user-answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: "Jawaban berhasil disimpan.",
        })

        router.back()
        form.reset()
      } else {
        toast({
          title: "Gagal",
          description: "Jawaban gagal disimpan.",
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 gap-12"
      >
        <Card className="flex flex-col items-start justify-between gap-12 p-6">
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

          {questionResp.data.map((question, index) => (
            <FormField
              control={form.control}
              name={`selected_answers.${question.id_question}`}
              render={({ field }) => (
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
                          <FormLabel className="font-normal">
                            {answer.answer_text}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="col-span-1 w-full font-heading">
            Submit
          </Button>
        </Card>
      </form>
    </Form>
  )
}
