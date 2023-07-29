"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"

const formSchema = z.object({
  id_quiz: z.number(),
  question_text: z.string(),
  answers: z.array(
    z.object({
      id: z.number(),
      answer_text: z.string(),
      is_correct: z.boolean().default(false).optional(),
    })
  ),
})

export function QuestionForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_quiz: 1,
      question_text: "",
      answers: [
        {
          id: 1,
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

  return (
    <Card className="flex flex-col gap-8 p-5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-heading font-semibold">Test Layouting</h1>

        <Button>Push Pertanyaan</Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            console.log(data)
          })}
          className="flex flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="question_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pertanyaan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan pertanyaan" {...field} />
                </FormControl>
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
                      <FormControl>
                        <Input placeholder="Masukkan jawaban" {...field} />
                      </FormControl>
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

              <Button onClick={() => remove(index)}>Remove</Button>
            </div>
          ))}
        </form>
      </Form>

      <Button
        onClick={() => append({ id: 1, answer_text: "", is_correct: false })}
      />
    </Card>
  )
}
