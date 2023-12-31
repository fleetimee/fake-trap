"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { QuizListResData } from "@/types/quiz/res"
import { createQuizMultipleChoice } from "@/lib/fetcher/quiz-fetcher"
import { cn } from "@/lib/utils"
import { multipleChoiceQuizSchema } from "@/lib/validations/quiz"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AddQuizMultipleFormProps {
  idSection: number
  quizList: QuizListResData[]
}

type Inputs = z.infer<typeof multipleChoiceQuizSchema>

export function AddQuizMultipleChoiceQuiz({
  idSection,
  quizList,
}: AddQuizMultipleFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(multipleChoiceQuizSchema),
    defaultValues: {
      quiz: [
        {
          id_quiz: 0,
        },
      ],
    },
  })

  async function onSubmit(values: Inputs): Promise<void> {
    startTransition(async () => {
      try {
        const res = await createQuizMultipleChoice({
          token: session?.user?.token,
          idSection: idSection,
          body: JSON.stringify(values),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description: "Quiz berhasil ditambahkan",
          })

          router.back()
          router.refresh()
          form.reset()
        } else {
          const errorResponse: ErrorResponse = await res.json()

          sonnerToast.error("Gagal", {
            description: `${errorResponse.error}`,
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-2xl gap-5"
      >
        <FormField
          control={form.control}
          name="quiz.0.id_quiz"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pilih Test <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? quizList.find(
                              (quiz) => quiz.id_quiz === field.value
                            )?.quiz_title
                          : "Pilih Test"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className=" w-[400px] p-0 xl:w-[680px]">
                    <Command>
                      <CommandInput placeholder="Cari test..." />
                      <CommandList>
                        <CommandEmpty>Quiz tidak ditemukan</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-full">
                            {quizList.map((quiz) => (
                              <CommandItem
                                value={quiz.quiz_title}
                                key={quiz.id_quiz}
                                onSelect={(value) => {
                                  form.clearErrors("quiz.0.id_quiz")
                                  form.setValue(
                                    "quiz.0.id_quiz",
                                    parseInt(quiz.id_quiz.toString())
                                  )
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    quiz.id_quiz === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {quiz.quiz_title}
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>Pilih test yang sudah dibuat</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Tambah
        </Button>
      </form>
    </Form>
  )
}
