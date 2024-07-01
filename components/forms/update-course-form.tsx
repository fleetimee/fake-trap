"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { CourseOneResData } from "@/types/course/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { UserRoleListResData } from "@/types/user/res"
import { updateCourse } from "@/lib/fetcher/course-fetcher"
import { cn } from "@/lib/utils"
import { updateCourseSchema } from "@/lib/validations/course"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { DateTimePicker } from "../ui/datetimepicker"
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
import { Textarea } from "../ui/textarea"
import { TimePickerDemo } from "../ui/timepicker-demo"
import { Zoom } from "../zoom-image"

type Inputs = z.infer<typeof updateCourseSchema>

type InputsWithIndexSignature = Inputs & { [key: string]: any }

interface UpdateCourseFormProps {
  course: CourseOneResData
  knowledge: KnowledgeListResData[]
  tutors: UserRoleListResData[]
  userId?: string
}

export function UpdateCourseForm({ course, userId }: UpdateCourseFormProps) {
  const { data: session } = useSession()

  const [selectedImage, setSelectedImage] = useState(
    `${process.env.NEXT_PUBLIC_BASE_URL}${course.image}`
  )

  const [isPending, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      CourseName: course.course_name,
      CourseDesc: course.course_desc,
      DateStart: new Date(course.date_start),
      DateEnd: new Date(course.date_end),
      UpdatedBy: userId ? userId : session?.expires.id,
    },
  })

  async function onSubmit(data: InputsWithIndexSignature) {
    startTransition(async () => {
      try {
        const formData = new FormData()

        Object.keys(data).forEach((key) => {
          if (data[key] instanceof Date) {
            formData.append(key, data[key].toISOString())
          } else {
            formData.append(key, data[key])
          }
        })

        if (data.image) {
          formData.append("image", data.image)
        }

        const res = await updateCourse({
          token: session?.user?.token,
          idCourse: course.id_course,
          body: formData,
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
          name="CourseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nama Pembelajaran <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ketikkan judul pembelajaran disini"
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
          name="CourseDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Pembelajaran</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ketikkan deskripsi pembelajaran disini"
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
                <Input
                  disabled={isPending}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      form.setValue("image", e.target.files[0])
                      setSelectedImage(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Preview Image</FormLabel>
          <FormControl>
            <Zoom>
              <Image
                src={selectedImage}
                alt="preview image"
                width={300}
                height={300}
                className="rounded-md"
                objectFit="cover"
              />
            </Zoom>
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="DateStart"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">
                Tanggal Mulai <span className="text-red-500">*</span>
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={isPending}
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
                    onSelect={(date) => {
                      field.onChange(date)
                    }}
                    initialFocus
                  />
                  <div className="border-t border-border p-3">
                    <TimePickerDemo
                      setDate={(date) => {
                        field.onChange(date)
                      }}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Tanggal mulai pembelajaran yang ingin dibuat.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="DateEnd"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">
                Tanggal Selesai <span className="text-red-500">*</span>
              </FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={isPending}
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
                    onSelect={(date) => {
                      field.onChange(date)
                    }}
                    initialFocus
                  />
                  <div className="border-t border-border p-3">
                    <TimePickerDemo
                      setDate={(date) => {
                        field.onChange(date)
                      }}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Tanggal selesai pembelajaran yang ingin dibuat.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="UpdatedBy"
          render={({ field }) => (
            <Input
              placeholder="Ketikkan judul pembelajaran disini"
              {...field}
              disabled
              type="hidden"
            />
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
