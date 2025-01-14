"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { QuizOneResData } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { timerOptions } from "@/config/timer-options"
import { updateExercise } from "@/lib/fetcher/exercise-fetcher"
import { cn } from "@/lib/utils"
import { updateTestSchema } from "@/lib/validations/test"
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
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

import { Calendar } from "../ui/calendar"
import { TimePickerDemo } from "../ui/timepicker-demo"

type Inputs = z.infer<typeof updateTestSchema>

interface UpdateTestFormProps {
  quiz: QuizOneResData
  references: ReferenceListRes
  userId?: string
}

export function UpdateTestForm({
  quiz,
  references,
  userId,
}: UpdateTestFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(updateTestSchema),
    defaultValues: {
      quiz_title: quiz.quiz_title,
      quiz_desc: quiz.quiz_desc,
      quiz_type: quiz.quiz_type,
      time_limit: quiz.time_limit,
      updated_by: userId ? userId : session?.expires.id,
      jam_buka: new Date(quiz.jam_buka),
      jam_tutup: new Date(quiz.jam_tutup),
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await updateExercise({
          token: session?.user?.token,
          idExercise: quiz.id_quiz.toString(),
          body: JSON.stringify(data),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description: "Data berhasil diubah",
          })

          router.back()
          router.refresh()
        } else {
          sonnerToast.error("Gagal", {
            description: "Data gagal diubah",
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
          name="quiz_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Judul Tes <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Masukkan judul ujian"
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quiz_desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Deskripsi Tes <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Masukkan deskripsi ujian"
                  disabled={isPending}
                  className="h-32 resize-none"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quiz_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tipe Ujian <span className="text-red-500">*</span>
              </FormLabel>

              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={isPending}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? references.data.find(
                              (quiz) => quiz.code_ref2 === field.value
                            )?.value_ref1
                          : "Pilih tipe ujian"}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0 xl:w-[680px]">
                    <Command>
                      <CommandInput placeholder="Pilih tipe quiz..." />
                      <CommandEmpty>Konten tidak ditemukan</CommandEmpty>
                      <CommandGroup>
                        {references.data.map((quiz) => (
                          <CommandItem
                            value={quiz.value_ref1}
                            key={quiz.id_ref}
                            onSelect={(value) => {
                              form.clearErrors("quiz_type")
                              form.setValue("quiz_type", quiz.code_ref2)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4",
                                quiz.code_ref2 === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {quiz.value_ref1}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Pilih tipe ujian yang akan dibuat
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time_limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Batas Waktu <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={isPending}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? timerOptions.find(
                              (timer) => timer.value === field.value
                            )?.label
                          : "Pilih batas waktu"}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0 xl:w-[680px]">
                    <Command>
                      <CommandInput placeholder="Pilih tipe quiz..." />
                      <CommandEmpty>Konten tidak ditemukan</CommandEmpty>
                      <CommandGroup>
                        {/* {references.data.map((quiz) => (
                          <CommandItem
                            value={quiz.value_ref1}
                            key={quiz.id_ref}
                            onSelect={(value) => {
                              form.clearErrors("quiz_type")
                              form.setValue("quiz_type", quiz.code_ref2)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4",
                                quiz.code_ref2 === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {quiz.value_ref1}
                          </CommandItem>
                        ))} */}

                        {timerOptions.map((timer) => (
                          <CommandItem
                            value={timer.label}
                            key={timer.value}
                            onSelect={(value) => {
                              form.clearErrors("time_limit")
                              form.setValue("time_limit", timer.value)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4",
                                timer.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {timer.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jam_buka"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Jam Buka <span className="text-red-500">*</span>
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="border-t border-border p-3">
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jam_tutup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Jam Tutup <span className="text-red-500">*</span>
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="border-t border-border p-3">
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="created_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dibuat Oleh</FormLabel>

              <FormControl>
                <Input {...field} disabled placeholder="" />
              </FormControl>
              <FormDescription>
                Ini adalah unique identifier dari user yang membuat ujian
              </FormDescription>
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="updated_by"
          render={({ field }) => (
            <Input {...field} disabled placeholder="" type="hidden" />
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  )
}
