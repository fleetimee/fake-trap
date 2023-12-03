"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { CourseData } from "@/types/course-res"
import { Knowledge } from "@/types/knowledge-res"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
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
import { Textarea } from "@/components/ui/textarea";





const formSchema = z.object({
  course_name: z
    .string({
      required_error: "Nama pelatihan harus diisi.",
    })
    .max(36, {
      message: "Nama pelatihan tidak boleh lebih dari 36 karakter.",
    })
    .nonempty({
      message: "Nama pelatihan harus diisi.",
    }),
  course_desc: z
    .string({
      required_error: "Deskripsi pelatihan harus diisi.",
    })
    .max(1000)
    .nonempty({
      message: "Deskripsi pelatihan harus diisi.",
    }),
  date_start: z.date({
    required_error: "Tanggal mulai pelatihan harus diisi.",
  }),
  date_end: z.date({
    required_error: "Tanggal berakhir pelatihan harus diisi.",
  }),
  image: z.string().optional(),
  id_knowledge: z.number({
    required_error: "Pengetahuan harus dipilih.",
  }),
})

export function EditCourseButton(props: {
  data: CourseData
  dataKnowledge: Knowledge
}) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsloading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_name: props.data.course_name,
      course_desc: props.data.course_desc,
      image: props.data.image,
      id_knowledge: props.data.id_knowledge,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsloading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${props.data.id_course}`,
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
        sonnerToast.success("Berhasil", {
          description: "Pelatihan berhasil diubah",
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        sonnerToast.error("Gagal", {
          description: "Pelatihan gagal diubah",
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: "Pelatihan gagal diubah",
      })
    } finally {
      setIsloading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="secondary" className="mr-2">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Pelatihan</SheetTitle>
          <SheetDescription>
            Ubah data pelatihan yang sudah dibuat
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
                    Judul Pelatihan <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Advanced React" {...field} />
                  </FormControl>
                  <FormDescription>
                    Judul pelatihan yang ingin dibuat.
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
                    Deskripsi Pelatihan <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Berikan sedikit deskripsi tentang pelatihan yang ingin dibuat"
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
                    Tanggal mulai pelatihan yang ingin dibuat.
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
                    Tanggal selesai pelatihan yang ingin dibuat.
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
                    Pengetahuan Terkait <span className="text-red-500">*</span>
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
                              ? props.dataKnowledge.data.find(
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
                          <CommandEmpty>Kategori tidak ditemukan</CommandEmpty>
                          <CommandGroup>
                            {props.dataKnowledge.data.map((knowledge) => (
                              <CommandItem
                                value={knowledge.id_knowledge.toString()}
                                key={knowledge.id_knowledge}
                                onSelect={(value) => {
                                  form.clearErrors("id_knowledge")
                                  form.setValue("id_knowledge", parseInt(value))
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
                    Pengetahuan yang ingin dikaitkan dengan pelatihan yang ingin
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
              {isLoading ? (
                <Icons.spinner className="h-5 w-5 animate-spin" />
              ) : (
                "Ubah"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
