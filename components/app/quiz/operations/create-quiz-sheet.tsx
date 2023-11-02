"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ReferenceListRes, ReferenceListResData } from "@/types/references/res"
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
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const quizTypes = [
  { value: 1, label: "Quiz" },
  { value: 2, label: "Exam" },
  { value: 3, label: "Assignment" },
]

const formSchema = z.object({
  quiz_title: z
    .string({
      required_error: "Judul kuis harus diisi",
    })
    .nonempty()
    .max(36, {
      message: "Judul kuis maksimal 36 karakter",
    })
    .nonempty({
      message: "Judul kuis harus diisi",
    }),
  quiz_desc: z
    .string({
      required_error: "Deskripsi kuis harus diisi",
    })
    .nonempty()
    .max(1000)
    .nonempty({
      message: "Deskripsi kuis harus diisi",
    }),
  quiz_type: z.string(),
})

interface CreateQuizSheetProps {
  referenceResp: ReferenceListRes
}

export function CreateQuizSheet({ referenceResp }: CreateQuizSheetProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quiz_title: "",
      quiz_desc: "",
      quiz_type: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Kuis berhasil dibuat",
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        toast({
          title: "Gagal",
          description: "Kuis gagal dibuat",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Kuis gagal dibuat",
        variant: "destructive",
      })

      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button className="ml-2">Tambah</Button>
      </SheetTrigger>
      <SheetContent size="content">
        <SheetHeader>
          <SheetTitle>Tambah Kuis</SheetTitle>
          <SheetDescription>
            Buat kuis baru untuk di assign ke dalam pelatihan
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 py-8"
          >
            <FormField
              control={form.control}
              name="quiz_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Judul Kuis <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Judul Kuis"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkan judul kuis yang akan dibuat
                  </FormDescription>
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
                    Deskripsi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Berikan deskripsi singkat tentang kuis"
                      className="h-32 resize-none"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkan deskripsi singkat tentang kuis yang akan dibuat
                  </FormDescription>

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
                            disabled={isLoading}
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? referenceResp.data.find(
                                  (quiz) => quiz.code_ref2 === field.value
                                )?.value_ref1
                              : "Pilih tipe kuis"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Tipe konten..." />
                          <CommandEmpty>Konten tidak ditemukan</CommandEmpty>
                          <CommandGroup>
                            {referenceResp.data.map((quiz) => (
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

            <Button type="submit" className="self-end">
              {isLoading ? (
                <Icons.spinner className="h-5 w-5 animate-spin" />
              ) : (
                "Tambah"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
