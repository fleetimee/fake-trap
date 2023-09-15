"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { CourseListResData } from "@/types/course/res"
import { KnowledgeListRes } from "@/types/knowledge/res"
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
import { Calendar } from "@/components/ui/calendar"
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
  DropdownMenuLabel,
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
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  course_name: z
    .string({
      required_error: "Nama kursus harus diisi.",
    })
    .max(36, {
      message: "Nama kursus tidak boleh lebih dari 36 karakter.",
    })
    .nonempty({
      message: "Nama kursus harus diisi.",
    }),
  course_desc: z
    .string({
      required_error: "Deskripsi kursus harus diisi.",
    })
    .max(1000)
    .nonempty({
      message: "Deskripsi kursus harus diisi.",
    }),
  date_start: z.date({
    required_error: "Tanggal mulai kursus harus diisi.",
  }),
  date_end: z.date({
    required_error: "Tanggal berakhir kursus harus diisi.",
  }),
  image: z.string().optional(),
  id_knowledge: z.number({
    required_error: "Pengetahuan harus dipilih.",
  }),
})

interface DeleteCourseProps {
  courseId: number
  token: string | undefined
}

async function deleteCourse({ courseId, token }: DeleteCourseProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${courseId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (res.ok) {
    toast({
      title: "Success",
      description: "Berhasil menghapus quiz",
    })

    return true
  } else {
    toast({
      title: "Error",
      description: "Gagal menghapus quiz",
      variant: "destructive",
    })

    return false
  }
}

interface CourseOperationProps {
  courseResp: CourseListResData
  knowledgeResp: KnowledgeListRes
}

export function CourseOperations({
  courseResp,
  knowledgeResp,
}: CourseOperationProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [openEditCourse, setOpenEditCourse] = React.useState<boolean>(false)
  const [openDeleteCourse, setOpenDeleteCourse] = React.useState<boolean>(false)

  const [isEditLoading, setIsEditLoading] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_name: courseResp.course_name,
      course_desc: courseResp.course_desc,
      image: courseResp.image,
      id_knowledge: courseResp.id_knowledge,
      date_start: new Date(courseResp.date_start),
      date_end: new Date(courseResp.date_end),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEditLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${courseResp.id_course}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          method: "PUT",
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        toast({
          title: "Kursus berhasil diubah",
          description: "Kursus berhasil diubah",
        })

        router.refresh()
        form.reset()
        setOpenEditCourse(false)
      } else {
        toast({
          title: "Kursus gagal diubah",
          description: "Kursus gagal diubah",
        })
      }
    } catch (error) {
      console.error(error)
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
            className="flex  items-center
            "
            onSelect={() => setOpenEditCourse(true)}
          >
            Edit
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex  items-center "
            onSelect={() => setOpenDeleteCourse(true)}
          >
            Hapus
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openDeleteCourse} onOpenChange={setOpenDeleteCourse}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin menghapus kursus ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Kursus yang sudah dihapus tidak dapat dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)

                const deleted = await deleteCourse({
                  courseId: courseResp.id_course,
                  token: session?.user.token,
                })

                if (deleted) {
                  setIsDeleteLoading(false)
                  setOpenDeleteCourse(false)
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
      <Sheet open={openEditCourse} onOpenChange={setOpenEditCourse}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Kursus</SheetTitle>
            <SheetDescription>
              Ubah data kursus yang sudah dibuat
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8 py-8"
            >
              <FormField
                control={form.control}
                name="course_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Judul Kursus <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Advanced React" {...field} />
                    </FormControl>
                    <FormDescription>
                      Judul kursus yang ingin dibuat.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="course_desc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Deskripsi Kursus <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Berikan sedikit deskripsi tentang kursus yang ingin dibuat"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Deskripsi pengetahuan yang ingin dibuat.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://pbs.twimg.com/media/FzRzbF0X0AMlifl?format=jpg&name=small"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Sisipkan url image.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tanggal Mulai <span className="text-red-500">*</span>
                    </FormLabel>
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
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pilih tanggal mulai</span>
                            )}
                            <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Calendar
                          className="w-full"
                          mode="single"
                          onSelect={(day: Date | undefined) => {
                            if (day) {
                              field.onChange(day)
                            }
                          }}
                          selected={field.value}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Tanggal mulai kursus yang ingin dibuat.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tanggal Selesai <span className="text-red-500">*</span>
                    </FormLabel>

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
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pilih tanggal selesai</span>
                            )}
                            <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Calendar
                          className="w-full"
                          mode="single"
                          onSelect={(day: Date | undefined) => {
                            if (day) {
                              field.onChange(day)
                            }
                          }}
                          selected={field.value}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Tanggal selesai kursus yang ingin dibuat.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id_knowledge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pengetahuan Terkait{" "}
                      <span className="text-red-500">*</span>
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
                                ? knowledgeResp.data.find(
                                    (knowledge) =>
                                      knowledge.id_knowledge === field.value
                                  )?.knowledge_title
                                : "Pilih Pengetahuan"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Command>
                            <CommandInput placeholder="Pengetahuan" />
                            <CommandEmpty>
                              Kategori tidak ditemukan
                            </CommandEmpty>
                            <CommandGroup>
                              {knowledgeResp.data.map((knowledge) => (
                                <CommandItem
                                  value={knowledge.knowledge_title}
                                  key={knowledge.id_knowledge}
                                  onSelect={() => {
                                    form.clearErrors("id_knowledge")
                                    form.setValue(
                                      "id_knowledge",
                                      knowledge.id_knowledge
                                    )
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      knowledge.id_knowledge === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {knowledge.knowledge_title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription>
                      Pengetahuan yang ingin dikaitkan dengan kursus yang ingin
                      dibuat. jika belum ada silahkan tambahkan{" "}
                      <Link
                        href="/dashboard/knowledge"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-8"
                      >
                        disini
                      </Link>
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
