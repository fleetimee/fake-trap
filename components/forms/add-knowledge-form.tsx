"use client"

import React, { useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { CategoryListRes } from "@/types/category/res"
import { ErrorResponseJson, SuccessResponse } from "@/types/error-res"
import { ReferenceListRes } from "@/types/references/res"
import { createKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { cn } from "@/lib/utils"
import { knowledgeSchema } from "@/lib/validations/knowledge"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Zoom } from "@/components/zoom-image"

type Inputs = z.infer<typeof knowledgeSchema>

type InputsWithIndexSignature = Inputs & { [key: string]: any }

interface AddKnowledgeFormProps {
  reference: ReferenceListRes
  category: CategoryListRes
  baseUrl?: string
}

export function AddKnowledgeForm({
  reference,
  category,
  baseUrl,
}: AddKnowledgeFormProps) {
  const [preview, setPreview] = React.useState<string | null>(null)

  const { data: session } = useSession()

  const [open, setOpen] = React.useState(false)

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(knowledgeSchema),
    defaultValues: {
      KnowledgeTitle: "",
      Description: "",
      image: new File([], ""),
      Status: "",
      IdCategory: 0,
      CreatedBy: session?.expires.id,
      UpdatedBy: session?.expires.id,
    },
  })

  // Add file validation function
  const validateImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return "File harus berupa gambar"
    }

    const fileSize = file.size / 1024 / 1024 // Convert to MB
    if (fileSize > 2) {
      return "Ukuran file tidak boleh lebih dari 2MB"
    }

    return true
  }

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

        const response = await createKnowledge({
          token: session?.user?.token,
          body: formData,
        })

        if (response.ok) {
          const responseData: SuccessResponse = await response.json()

          const newKnowledgeId = responseData.data

          sonnerToast.success(
            `Success ${response.status}: ${response.statusText}`,
            {
              description:
                responseData.message || "Materi berhasil ditambahkan",
            }
          )

          if (baseUrl) {
            router.push(`${baseUrl}/detail/${newKnowledgeId}`)
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-2xl gap-5"
      >
        <FormField
          control={form.control}
          name="KnowledgeTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Judul Materi <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Tuliskan judul materi yang ingin dibuat"
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Deskripsi Materi <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tuliskan deskripsi materi yang ingin dibuat"
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
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Gambar</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan link gambar"
                  disabled={isPending}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0]
                      const validationResult = validateImageFile(file)

                      if (validationResult === true) {
                        form.setValue("image", file)
                        form.clearErrors("image") // Clear any existing errors
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setPreview(reader.result as string)
                        }
                        reader.readAsDataURL(file)
                      } else {
                        form.setError("image", {
                          type: "manual",
                          message: validationResult,
                        })
                        e.target.value = ""
                        setPreview(null)
                      }
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                Gambar ini opsional, jika tidak diisi maka akan menggunakan
                gambar default. Maksimal ukuran file 2MB.
              </FormDescription>
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
          name="Status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
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
                          ? reference.data.find(
                              (content) => content.code_ref2 === field.value
                            )?.value_ref1
                          : "Pilih Visibility"}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0 xl:w-[680px]">
                    <Command>
                      <CommandInput placeholder="Tipe konten..." />
                      <CommandEmpty>Konten tidak ditemukan</CommandEmpty>
                      <CommandGroup>
                        {reference.data.map((content) => (
                          <CommandItem
                            value={content.value_ref1}
                            key={content.id_ref}
                            onSelect={() => {
                              form.clearErrors("Status")
                              form.setValue("Status", content.code_ref2)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 size-4",
                                content.code_ref2 === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {content.value_ref1}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="IdCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Modul <span className="text-red-500">*</span>{" "}
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
                          ? category.data.find(
                              (category) => category.id_category === field.value
                            )?.category_name
                          : "Pilih Modul"}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="h-[300px] w-[400px] p-0 xl:w-[680px]">
                    <Command>
                      <CommandInput placeholder="Jenis Modul" />
                      <CommandList>
                        <CommandEmpty>Modul tidak ditemukan</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-full">
                            {category.data.map((category) => (
                              <CommandItem
                                value={category.category_name}
                                key={category.id_category}
                                onSelect={() => {
                                  form.clearErrors("IdCategory")
                                  form.setValue(
                                    "IdCategory",
                                    category.id_category
                                  )
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 size-4",
                                    category.id_category === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {category.category_name}
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </CommandList>
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
          name="CreatedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Dibuat Oleh <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Created By" disabled />
              </FormControl>
              <FormDescription>
                Ini adalah unique identifier dari user yang membuat ujian
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Tambah
        </Button>
      </form>
    </Form>
  )
}
