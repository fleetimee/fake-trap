"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import format from "date-fns/format"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { CourseOneResData } from "@/types/course/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { UserRoleListResData } from "@/types/user/res"
import { cn } from "@/lib/utils"
import { courseSchema } from "@/lib/validations/course"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ScrollArea } from "../ui/scroll-area"
import { Textarea } from "../ui/textarea"

type Inputs = z.infer<typeof courseSchema>

interface UpdateCourseFormProps {
  course: CourseOneResData
  knowledge: KnowledgeListResData[]
  tutors: UserRoleListResData[]
}

export function UpdateCourseForm({
  course,
  knowledge,
  tutors,
}: UpdateCourseFormProps) {
  const { data: session } = useSession()

  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      course_name: course.course_name,
      course_desc: course.course_desc,
      image: course.image,
      id_knowledge: course.id_knowledge,
      tutor_uuid: course.tutor_uuid,
      date_start: new Date(course.date_start),
      date_end: new Date(course.date_end),
      created_by: course.created_by,
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${course.id_course}`

        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(data),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description: "Data berhasil diubah",
          })

          router.back()
          router.refresh()
          form.reset()
        } else {
          sonnerToast.error("Gagal", {
            description: "Data gagal diubah",
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal", {
          description: "Data gagal diubah",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="course_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nama Pelatihan <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ketikkan judul pelatihan disini"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
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
                        disabled={isPending}
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? knowledge.find(
                              (knowledge) =>
                                knowledge.id_knowledge === field.value
                            )?.knowledge_title
                          : "Pilih Pengetahuan"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0 xl:w-[620px]">
                    <Command>
                      <CommandInput placeholder="Cari Pengetahuan" />

                      <CommandList>
                        <CommandEmpty>Pengetahuan tidak ditemukan</CommandEmpty>

                        <CommandGroup>
                          <ScrollArea className="h-full">
                            {knowledge.map((knowledge) => (
                              <CommandItem
                                value={knowledge.knowledge_title}
                                key={knowledge.id_knowledge}
                                onSelect={(value) => {
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
                          </ScrollArea>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Pengetahuan terkait yang ingin dibuat pelatihan ini
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tutor_uuid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pemateri <span className="text-red-500">*</span>
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
                          ? tutors.find(
                              (tutor) => tutor.user_uuid === field.value
                            )?.name
                          : "Pilih Pemateri"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0 xl:w-[620px]">
                    <Command>
                      <CommandInput placeholder="Cari Pemateri" />

                      <CommandList>
                        <CommandEmpty>Pemateri tidak ditemukan</CommandEmpty>

                        <CommandGroup>
                          <ScrollArea className="h-full">
                            {tutors.map((tutor) => (
                              <CommandItem
                                value={tutor.name}
                                key={tutor.user_uuid}
                                onSelect={(value) => {
                                  form.clearErrors("tutor_uuid")
                                  form.setValue("tutor_uuid", tutor.user_uuid)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    tutor.user_uuid === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {tutor.name}
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Pemateri yang akan mengajar pelatihan ini
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
              <FormLabel>Deskripsi Pelatihan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ketikkan deskripsi pelatihan disini"
                  {...field}
                  disabled={isPending}
                  className="h-40 resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ketikkan deskripsi pelatihan disini"
                  {...field}
                  disabled={isPending}
                  className="h-20 resize-none"
                />
              </FormControl>
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
                      disabled={isPending}
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
                      disabled={isPending}
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
          name="created_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Dibuat Oleh <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ketikkan judul pelatihan disini"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormDescription>
                Ini adalah unique identifier dari user yang membuat pelatihan
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  )
}
