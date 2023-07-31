"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "../../../ui/button"
import { Card } from "../../../ui/card"
import { Checkbox } from "../../../ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../ui/form"
import { Input } from "../../../ui/input"
import { toast } from "../../../ui/use-toast"

export const formSchemaQuestion = z.object({
  id_quiz: z.number(),
  question_text: z.string().nonempty(),
  answers: z.array(
    z.object({
      answer_text: z.string().nonempty(),
      is_correct: z.boolean().default(false).optional(),
    })
  ),
})

export function QuestionForm(props: {
  setQuizzes: React.Dispatch<
    React.SetStateAction<
      {
        id_quiz: number
        question_text: string
        answers: {
          answer_text: string
          is_correct?: boolean | undefined
        }[]
      }[]
    >
  >
}) {
  const [parent, enableAnimations] = useAutoAnimate()

  const form = useForm<z.infer<typeof formSchemaQuestion>>({
    resolver: zodResolver(formSchemaQuestion),
    defaultValues: {
      id_quiz: 1,
      question_text: "",
      answers: [
        {
          answer_text: "",
          is_correct: false,
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "answers",
    control: form.control,
  })

  async function onSubmit(data: z.infer<typeof formSchemaQuestion>) {
    // check if there is any correct answer
    const isCorrectAnswer = form.getValues("answers").some((answer) => {
      return answer.is_correct
    })

    // check if the correct answer is only one
    const correctAnswer = form.getValues("answers").filter((answer) => {
      return answer.is_correct
    })

    if (form.getValues("answers").length < 2) {
      return toast({
        title: "Error",
        description: "Jawaban minimal 2 pilihan",
        variant: "destructive",
      })
    }

    if (!isCorrectAnswer) {
      return toast({
        title: "Error",
        description: "Jawaban benar harus ada",
        variant: "destructive",
      })
    }

    if (correctAnswer.length > 1) {
      return toast({
        title: "Error",
        description: "Jawaban benar hanya boleh satu",
        variant: "destructive",
      })
    }

    props.setQuizzes((prev) => [...prev, data])

    form.reset({
      id_quiz: 1,
      question_text: "",
      answers: [
        {
          answer_text: "",
          is_correct: false,
        },
      ],
    })

    toast({
      title: "Success",
      description: "Pertanyaan berhasil ditambahkan",
    })
  }

  function onAddAnswer() {
    // Check if answer length is more than 5
    if (form.getValues("answers").length > 4) {
      return toast({
        title: "Error",
        description: "Jawaban maksimal 5 pilihan",
        variant: "destructive",
      })
    }

    append({ answer_text: "", is_correct: false })
  }

  return (
    <Card className="flex flex-col gap-8 p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8"
          ref={parent}
        >
          <div className="flex flex-row items-center justify-between">
            <h1 className="font-heading font-semibold">Pertanyaan</h1>

            <Button type="submit">Push Pertanyaan</Button>
          </div>

          <FormField
            control={form.control}
            name="question_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pertanyaan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan pertanyaan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {fields.map((field, index) => (
            <div key={field.id}>
              <div className="grid grid-rows-2 ">
                <FormField
                  control={form.control}
                  name={`answers.${index}.answer_text`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jawaban {index + 1}</FormLabel>
                      <div className="flex flex-row items-center space-x-3">
                        <FormControl>
                          <Input placeholder="Masukkan jawaban" {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="destructive"
                        >
                          Hapus
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`answers.${index}.is_correct`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange as any}
                        />
                      </FormControl>
                      <FormLabel>Jawaban Benar ?</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </form>
      </Form>

      <Button onClick={onAddAnswer}>Tambah Jawaban</Button>
    </Card>
  )
}
