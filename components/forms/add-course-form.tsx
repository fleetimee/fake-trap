"use client"

import React, { useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { add, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponseJson, SuccessResponse } from "@/types/error-res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { UserRoleListResData } from "@/types/user/res"
import { createCourse } from "@/lib/fetcher/course-fetcher"
import { cn } from "@/lib/utils"
import { courseSchema } from "@/lib/validations/course"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { Zoom } from "@/components/zoom-image"

import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { TimePickerDemo } from "../ui/timepicker-demo"

type Inputs = z.infer<typeof courseSchema>

type InputsWithIndexSignature = Inputs & { [key: string]: any }

interface AddCourseFormProps {
  knowledge: KnowledgeListResData[]
  tutors: UserRoleListResData[]
  baseUrl?: string
  userId?: string
}

export function AddCourseForm({ baseUrl, userId }: AddCourseFormProps) {
  const { data: session } = useSession()

  const [preview, setPreview] = React.useState<string | null>(null)

  const [isLoading, startTransition] = useTransition()

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      CourseName: "",
      CourseDesc: "",
      DateStart: new Date(),
      DateEnd: new Date(),
      image: new File([], ""),
      CreatedBy: userId ? userId : session?.expires.id,
      UpdatedBy: userId ? userId : session?.expires.id,
    },
  })

  async function onSubmit(data: InputsWithIndexSignature) {
    startTransition(async () => {
      try {
        const formData = new FormData()

        //append data to form data
        Object.keys(data).forEach((key) => {
          if (data[key] instanceof Date) {
            formData.append(key, data[key].toISOString())
          } else {
            formData.append(key, data[key])
          }
        })

        const response = await createCourse({
          token: session?.user.token,
          body: formData,
        })

        console.log(response)

        if (response.ok) {
          const responseData: SuccessResponse = await response.json()

          const newCourseId = responseData.data

          sonnerToast.success(
            `Success ${response.status}: ${response.statusText}`,
            {
              description:
                responseData.message || "Pembelajaran berhasil dibuat",
            }
          )

          if (baseUrl) {
            router.push(`${baseUrl}/detail/${newCourseId}/people/new`)
            router.refresh()
            form.reset()
          } else {
            router.back()
            router.refresh()
            form.reset()
          }
        } else {
          const errorResponse: ErrorResponseJson = await response.json()

          sonnerToast.error(
            `Error ${response.status}: ${response.statusText}`,
            {
              description: errorResponse.message,
            }
          )
        }
      } catch (error) {
        console.error(error)

        sonnerToast.error("Gagal", {
          description: `${error}`,
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
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="IdKnowledge"
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
                        disabled={isLoading}
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
                                  form.clearErrors("IdKnowledge")
                                  form.setValue(
                                    "IdKnowledge",
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
                Pengetahuan terkait yang ingin dibuat pembelajaran ini
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="TutorUUID"
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
                        disabled={isLoading}
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
                                  form.clearErrors("TutorUUID")
                                  form.setValue("TutorUUID", tutor.user_uuid)
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
                Pemateri yang akan mengajar pembelajaran ini
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

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
                  disabled={isLoading}
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
          render={() => (
            <FormItem>
              <FormLabel>Gambar</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  disabled={isLoading}
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      form.setValue("image", e.target.files[0])

                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setPreview(reader.result as string)
                      }
                      reader.readAsDataURL(e.target.files[0])
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Preview</FormLabel>
          <FormControl>
            {preview && (
              <Zoom>
                <Image
                  src={preview}
                  alt="Picture of the author"
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              </Zoom>
            )}
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="DateStart"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">Tanggal Mulai</FormLabel>
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
                    disablePastDates
                  />
                  <div className="border-t border-border p-3">
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
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
                      disabled={isLoading}
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
                    disablePastDates
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
          name="CreatedBy"
          render={({ field }) => (
            <Input
              placeholder="Ketikkan judul pembelajaran disini"
              {...field}
              disabled
              type="hidden"
            />
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

        <Button type="submit" className="w-fit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Tambah
        </Button>
      </form>
    </Form>
  )
}
