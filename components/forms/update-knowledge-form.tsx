"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { CategoryListRes } from "@/types/category/res"
import { KnowledgeOneResData } from "@/types/knowledge/res"
import { ReferenceListRes } from "@/types/references/res"
import { cn } from "@/lib/utils"
import { knowledgeSchema } from "@/lib/validations/knowledge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Icons } from "../icons"
import { Button } from "../ui/button"
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
import { ScrollArea } from "../ui/scroll-area"
import { Textarea } from "../ui/textarea"

type Inputs = z.infer<typeof knowledgeSchema>

type InputsWithIndexSignature = Inputs & { [key: string]: any }

interface UpdateKnowledgeFormProps {
  knowledge: KnowledgeOneResData
  reference: ReferenceListRes
  category: CategoryListRes
}

export function UpdateKnowledgeForm({
  knowledge,
  reference,
  category,
}: UpdateKnowledgeFormProps) {
  const { data: session } = useSession()

  const [selectedImage, setSelectedImage] = useState(
    `${process.env.NEXT_PUBLIC_BASE_URL}${knowledge.image}`
  )

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(knowledgeSchema),
    defaultValues: {
      knowledge_title: knowledge.knowledge_title,
      description: knowledge.description,
      status: knowledge.status,
      id_category: knowledge.id_category,
      updated_by: session?.expires.id,
      created_by: session?.expires.id,
    },
  })

  async function onSubmit(data: InputsWithIndexSignature) {
    startTransition(async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${knowledge.id_knowledge}`

        const formData = new FormData()

        // append data
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key])
        })

        // append image
        if (data.image) {
          formData.append("image", data.image)
        }

        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: formData,
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Pengetahuan berhasil diubah",
          })

          router.back()
          router.refresh()
        } else {
          sonnerToast.error("Gagal", {
            description: "Pengetahuan gagal diubah",
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal", {
          description: `${error}`,
        })
      }
    })

    // setIsLoading(true)

    // try {
    //   const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${knowledge.id_knowledge}`

    //   const response = await fetch(url, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${session?.user.token}`,
    //     },
    //     body: JSON.stringify(data),
    //   })

    //   if (response.ok) {
    //     sonnerToast.success("Berhasil", {
    //       description: "Pengetahuan berhasil diubah",
    //     })

    //     router.back()
    //     router.refresh()
    //   } else {
    //     sonnerToast.error("Gagal", {
    //       description: "Pengetahuan gagal diubah",
    //     })
    //   }
    // } catch (error) {
    //   sonnerToast.error("Gagal", {
    //     description: `${error}`,
    //   })
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-2xl gap-5"
      >
        <FormField
          control={form.control}
          name="knowledge_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Judul Pengetahuan <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Judul Pengetahuan"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Deskripsi Pengetahuan <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Tuliskan deskripsi pengetahuan yang ingin dibuat"
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
            <Image
              src={selectedImage}
              alt={knowledge.knowledge_title}
              width={200}
              height={200}
              className="rounded-md"
            />
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
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
                          ? reference.data.find(
                              (content) => content.code_ref2 === field.value
                            )?.value_ref1
                          : "Pilih Status"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                            onSelect={(value) => {
                              form.clearErrors("status")
                              form.setValue("status", content.code_ref2)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Kategori <span className="text-red-500">*</span>{" "}
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
                          : "Pilih Kategori"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="h-[300px] w-[400px] p-0 xl:w-[680px]">
                    <Command>
                      <CommandInput placeholder="Jenis Kategori" />
                      <CommandList>
                        <CommandEmpty>Kategori tidak ditemukan</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-full">
                            {category.data.map((category) => (
                              <CommandItem
                                value={category.category_name}
                                key={category.id_category}
                                onSelect={(value) => {
                                  form.clearErrors("id_category")
                                  form.setValue(
                                    "id_category",
                                    category.id_category
                                  )
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
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
          name="updated_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Disunting oleh <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Created By" disabled />
              </FormControl>
              <FormDescription>
                Ini adalah unique identifier dari user yang mensuting tes ini
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
