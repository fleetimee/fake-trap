"use client"

import React, { useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import format from "date-fns/format"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
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
import { Zoom } from "../zoom-image"

type Inputs = z.infer<typeof courseSchema>

type InputsWithIndexSignature = Inputs & { [key: string]: any }

interface AddCourseFormProps {
  knowledge: KnowledgeListResData[]
  tutors: UserRoleListResData[]
}

export function AddCourseForm({ knowledge, tutors }: AddCourseFormProps) {
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
      CreatedBy: session?.expires.id,
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

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
            body: formData,
          }
        )

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Pelatihan berhasil dibuat",
          })

          router.back()
          router.refresh()
          form.reset()
        } else {
          const errorResponse: ErrorResponse = await response.json()

          sonnerToast.error("Gagal", {
            description: `${errorResponse.error}`,
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
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="CourseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nama Pelatihan <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ketikkan judul pelatihan disini"
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
                Pengetahuan terkait yang ingin dibuat pelatihan ini
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
                Pemateri yang akan mengajar pelatihan ini
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
              <FormLabel>Deskripsi Pelatihan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ketikkan deskripsi pelatihan disini"
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
            <FormItem>
              <FormLabel>
                Tanggal Mulai <span className="text-red-500">*</span>
              </FormLabel>

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
          name="DateEnd"
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
                      disabled={isLoading}
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
          name="CreatedBy"
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

        <Button type="submit" className="w-fit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Tambah
        </Button>
      </form>
    </Form>
  )
}
