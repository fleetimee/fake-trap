"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ReferenceListRes } from "@/types/references/res"
import { cn } from "@/lib/utils"
import { testSchema } from "@/lib/validations/test"
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



import { Icons } from "../icons";


type Inputs = z.infer<typeof testSchema>

interface AddTestFormProps {
  references: ReferenceListRes
}

export function AddTestForm({ references }: AddTestFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      quiz_title: "",
      quiz_desc: "",
      quiz_type: "",
      created_by: session?.expires.id,
      updated_by: session?.expires.id,
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz`

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Tes berhasil dibuat",
          })

          router.back()
          router.refresh()
          form.reset()
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
                  placeholder="Masukkan judul tes"
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
                  placeholder="Masukkan deskripsi tes"
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
                Tipe Kuis <span className="text-red-500">*</span>
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
                          : "Pilih tipe kuis"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                                "mr-2 h-4 w-4",
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
                Pilih tipe kuis yang akan dibuat
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="created_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dibuat Oleh</FormLabel>

              <FormControl>
                <Input {...field} disabled placeholder="" />
              </FormControl>
              <FormDescription>
                Ini adalah unique identifier dari user yang membuat tes
              </FormDescription>
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
