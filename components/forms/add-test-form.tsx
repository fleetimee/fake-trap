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

import { ReferenceListRes } from "@/types/references/res"
import { timerOptions } from "@/config/timer-options"
import { createExercise } from "@/lib/fetcher/exercise-fetcher"
import { cn } from "@/lib/utils"
import { createTestSchema, updateTestSchema } from "@/lib/validations/test"
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

import { Icons } from "../icons"
import { Calendar } from "../ui/calendar"
import { TimePickerDemo } from "../ui/timepicker-demo"

type Inputs = z.infer<typeof createTestSchema>

interface AddTestFormProps {
  references: ReferenceListRes
  baseUrl?: string
  userId?: string
}

export function AddTestForm({ references, baseUrl, userId }: AddTestFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(createTestSchema),
    defaultValues: {
      quiz_title: "",
      quiz_desc: "",
      quiz_type: "",
      created_by: userId ? userId : session?.expires.id,
      updated_by: userId ? userId : session?.expires.id,
      time_limit: 0,
      jam_buka: new Date(),
      jam_tutup: new Date(),
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const response = await createExercise({
          token: session?.user?.token,
          body: JSON.stringify(data),
        })

        if (response.ok) {
          const responseData = await response.json()

          const newExerciseId = responseData.data

          sonnerToast.success("Berhasil", {
            description: "Tes berhasil dibuat",
          })

          if (baseUrl) {
            router.push(`${baseUrl}/detail/${newExerciseId}`)
            router.refresh()
            form.reset()
          } else {
            router.back()
            router.refresh()
            form.reset()
          }
        } else {
          sonnerToast.error("Gagal", {
            description: "Tes gagal dibuat",
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

        <FormField
          control={form.control}
          name="created_by"
          render={({ field }) => <Input type="hidden" {...field} disabled />}
        />

        <FormField
          control={form.control}
          name="updated_by"
          render={({ field }) => <Input type="hidden" {...field} disabled />}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Tambah
        </Button>
      </form>
    </Form>
  )
}
