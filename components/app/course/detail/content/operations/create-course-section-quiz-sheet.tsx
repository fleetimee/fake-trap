"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { QuizListRes } from "@/types/quiz/res"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"





const formSchema = z.object({
  quiz: z
    .array(
      z.object({
        id_quiz: z
          .number({
            required_error: "Pilih setidaknya satu quiz.",
          })
          .int(),
      })
    )
    .nonempty({ message: "Pilih setidaknya satu quiz." }),
})

interface AddCourseQuizSheetProps {
  id_section: number
  quizData: QuizListRes
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function AddCourseQuizSheet({ ...props }: AddCourseQuizSheetProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${props.id_section}/quiz`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        sonnerToast.success("Berhasil", {
          description: "Quiz berhasil ditambahkan pada bagian ini",
        })

        router.refresh()
        form.reset()
        props.setOpen(false)
      } else {
        sonnerToast.error("Gagal", {
          description: "Quiz gagal ditambahkan pada bagian ini",
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: `${error}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SheetContent size="content">
      <SheetHeader>
        <SheetTitle>Tambah Quiz</SheetTitle>
        <SheetDescription>
          Tambah quiz baru ke dalam bagian ini
        </SheetDescription>
      </SheetHeader>
      {props.quizData.data && props.quizData.data.length > 0 ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 py-8"
          >
            <FormField
              control={form.control}
              name={"quiz.0.id_quiz"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Pilih Quiz <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? props.quizData.data.find(
                                  (quiz) => quiz.id_quiz === field.value
                                )?.quiz_title
                              : "Pilih quiz..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Tipe konten..." />
                          <CommandEmpty>Kuis tidak ditemukan</CommandEmpty>
                          <CommandGroup>
                            {props.quizData.data.map((quiz) => (
                              <CommandItem
                                value={quiz.id_quiz.toString()}
                                key={quiz.id_quiz}
                                onSelect={(value) => {
                                  form.clearErrors("quiz.0.id_quiz")
                                  form.setValue(
                                    "quiz.0.id_quiz",
                                    parseInt(value)
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
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Pilih quiz yang ingin ditambahkan
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="self-end">
              {isLoading ? (
                <Icons.spinner className="h-5 w-5 animate-spin" />
              ) : (
                "Tambah"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <p>Tidak ada quiz yang tersedia. Silahkan buat quiz terlebih dahulu.</p>
      )}
    </SheetContent>
  )
}
