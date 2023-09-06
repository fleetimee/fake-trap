import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { QuestionListResData } from "@/types/question/res"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

interface CourseQuizFormProps {
  question: QuestionListResData
  index: number
}

const formSchema = z.object({
  uuid: z.string(),
  id_quiz: z.number(),
  selected_answer: z.record(z.string(), z.number()),
})

export function CourseQuizForm({ question, index }: CourseQuizFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uuid: session?.expires.id,
      id_quiz: question.id_quiz,
      selected_answer: {},
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // setIsLoading(true)

    console.log(values)

    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_BASE_URL}/secure/user-answer`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${session?.user.token}`,
    //       },
    //     }
    //   )
    //
    //   if (res.ok) {
    //     toast({
    //       title: "Berhasil",
    //       description: "Jawaban berhasil disimpan.",
    //     })
    //
    //     router.refresh()
    //     form.reset()
    //   } else {
    //     toast({
    //       title: "Gagal",
    //       description: "Jawaban gagal disimpan.",
    //     })
    //   }
    // } catch (error) {
    //   console.log(error)
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 justify-between gap-4"
      >
        <FormField
          control={form.control}
          name={`selected_answer.${question.id_question}`}
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
                      `selected_answer.${question.id_question}`,
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
                        <RadioGroupItem value={answer.id_answer.toString()} />
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

        <Button type="submit" className="col-span-1 font-heading">
          Submit
        </Button>
      </form>
    </Form>

    // <div className="grid grid-cols-1 justify-between gap-4">
    //   <p className="font-heading text-sm">
    //     {index + 1}. {question.question_text}
    //   </p>
    //
    //   {/*  Implement Radio Button for answer*/}
    //
    //   <div className="grid grid-cols-2 items-center justify-between gap-4">
    //     {question.answers.map((answer, index) => (
    //       <RadioGroup key={index}>
    //         <div className="flex items-center space-x-2">
    //           <RadioGroupItem
    //             value={answer.id_answer.toString()}
    //             id={answer.id_answer.toString()}
    //           />
    //           <Label className="font-light">{answer.id_answer}</Label>
    //         </div>
    //       </RadioGroup>
    //     ))}
    //   </div>
    // </div>
  )
}
