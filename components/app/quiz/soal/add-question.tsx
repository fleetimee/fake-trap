"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import * as XLSX from "xlsx"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const formSchemaQuestion = z.object({
  id_quiz: z.number(),
  question_text: z.string().min(1, "Pertanyaan tidak boleh kosong"),
  answers: z.array(
    z.object({
      answer_text: z.string().min(1, "Jawaban tidak boleh kosong"),
      is_correct: z.boolean().default(false).optional(),
    })
  ),
})

export function QuestionForm(props: {
  idQuiz: string
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
      id_quiz: parseInt(props.idQuiz),
      question_text: "",
      answers: [
        {
          answer_text: "",
          is_correct: false,
        },
      ],
    },
  })

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      if (!e.target) return
      const data = new Uint8Array(e.target.result as ArrayBuffer)
      const workbook = XLSX.read(data, { type: "array" })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        range: 1,
      }) as (string | boolean)[][]

      console.log(jsonData)

      const quizzes = jsonData
        .filter((row) => row.length > 0) // Exclude empty arrays
        .map((row) => {
          const id_quiz = parseInt(props.idQuiz) // Get id_quiz from props
          const question_text = row[0] as string
          const answers = []
          for (let i = 1; i < row.length; i += 2) {
            const answer_text = row[i] !== undefined ? String(row[i]) : "" // Convert answer_text to string
            const is_correct = row[i + 1] as boolean
            if (answer_text.trim() !== "") {
              answers.push({ answer_text, is_correct })
            }
          }
          return { id_quiz, question_text, answers }
        })

      console.log(quizzes)

      props.setQuizzes((prev) => [...prev, ...quizzes])
    }
    reader.readAsArrayBuffer(file)
  }

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
      return sonnerToast.warning("Perhatian", {
        description: "Minimal harus ada 2 pilihan jawaban",
      })
    }

    if (!isCorrectAnswer) {
      return sonnerToast.warning("Perhatian", {
        description: "Harus ada minimal satu jawaban yang benar",
      })
    }

    if (correctAnswer.length > 1) {
      return sonnerToast.warning("Perhatian", {
        description: "Hanya boleh ada satu jawaban yang benar",
      })
    }

    props.setQuizzes((prev) => [...prev, data])

    form.reset({
      id_quiz: parseInt(props.idQuiz),
      question_text: "",
      answers: [
        {
          answer_text: "",
          is_correct: false,
        },
      ],
    })

    sonnerToast.success("Berhasil", {
      description: "Pertanyaan berhasil ditambahkan",
    })
  }

  function onAddAnswer() {
    if (form.getValues("answers").length > 4) {
      return sonnerToast.warning("Perhatian", {
        description: "Maksimal hanya 5 pilihan jawaban",
      })
    }

    append({ answer_text: "", is_correct: false })
  }

  const answers = form.getValues("answers")
  const hasCorrectAnswer = answers.some((answer) => answer.is_correct)

  answers.forEach((answer, index) => {
    if (answer.is_correct && !hasCorrectAnswer) {
      form.setValue(`answers.${index}.is_correct`, true)
    }
  })

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

            <Button type="submit">Tambah Pertanyaan</Button>
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

      <div className="flex flex-col items-center justify-center gap-4 space-y-2">
        <Button onClick={onAddAnswer} className="w-full max-w-sm">
          Tambah Jawaban
        </Button>

        <p className="text-sm text-muted-foreground">Atau</p>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Import dari Excel</Label>
          <div>
            <Input
              id="picture"
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
            />{" "}
          </div>
        </div>
      </div>
    </Card>
  )
}
