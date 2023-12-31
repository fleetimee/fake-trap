"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { QuizListResData } from "@/types/quiz/res"
import { ReferenceListRes } from "@/types/references/res"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

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

interface DeleteQuizProps {
  id: number
  token: string | undefined
}

async function deleteQuiz({ id, token }: DeleteQuizProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (response.ok) {
    sonnerToast.success("Berhasil", {
      description: "Berhasil menghapus quiz",
    })

    return true
  } else {
    sonnerToast.error("Gagal", {
      description: "Gagal menghapus quiz",
    })

    return false
  }
}

interface QuizOperationsProps {
  quiz: QuizListResData
  referenceResp: ReferenceListRes
  linkString: string
}

export function QuizOperations({
  quiz,
  referenceResp,
  linkString,
}: QuizOperationsProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [openEditQuizSheet, setOpenEditQuizSheet] =
    React.useState<boolean>(false)

  const [openDeleteQuiz, setOpenDeleteQuiz] = React.useState<boolean>(false)

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const [isEditLoading, setIsEditLoading] = React.useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quiz_title: quiz.quiz_title,
      quiz_desc: quiz.quiz_desc,
      quiz_type: quiz.quiz_type,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEditLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz/${quiz.id_quiz}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        sonnerToast.success("Berhasil", {
          description: "Berhasil mengubah quiz",
        })

        setIsEditLoading(false)
        setOpenEditQuizSheet(false)
        router.refresh()
      } else {
        sonnerToast.error("Gagal", {
          description: "Gagal mengubah quiz",
        })

        setIsEditLoading(false)
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: `${error}`,
      })
    } finally {
      setIsEditLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            className="flex items-center
            "
            // onSelect={() => setOpenEditQuizSheet(true)}
          >
            <Link
              href={`${linkString}/update/${quiz.id_quiz}`}
              className="flex w-full cursor-default items-center"
            >
              Update
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex  items-center "
            onSelect={() => setOpenDeleteQuiz(true)}
          >
            Hapus
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openDeleteQuiz} onOpenChange={setOpenDeleteQuiz}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin menghapus quiz ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Quiz yang sudah dihapus tidak dapat dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteQuiz({
                  id: quiz.id_quiz,
                  token: session?.user.token,
                })

                if (deleted) {
                  setIsDeleteLoading(false)
                  setOpenDeleteQuiz(false)
                  router.refresh()
                } else {
                  setIsDeleteLoading(false)
                }
              }}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Sheet open={openEditQuizSheet} onOpenChange={setOpenEditQuizSheet}>
        <SheetContent size="content">
          <SheetHeader>
            <SheetTitle>Edit Kuis</SheetTitle>
            <SheetDescription>Edit kuis yang sudah dibuat</SheetDescription>
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
                        disabled={isEditLoading}
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
                        disabled={isEditLoading}
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
                              disabled={isEditLoading}
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
                {isEditLoading ? (
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                ) : (
                  "Ubah"
                )}
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  )
}
