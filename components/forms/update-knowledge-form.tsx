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
import { updateKnowledge } from "@/lib/fetcher/knowledge-fetcher"
import { cn } from "@/lib/utils"
import { updateKnowledgeSchema } from "@/lib/validations/knowledge"
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
import { Zoom } from "../zoom-image"

type Inputs = z.infer<typeof updateKnowledgeSchema>

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

  const form = useForm<Inputs>({
    resolver: zodResolver(updateKnowledgeSchema),
    defaultValues: {
      KnowledgeTitle: knowledge.knowledge_title,
      Description: knowledge.description,
      Status: knowledge.status,
      IdCategory: knowledge.id_category,
      UpdatedBy: session?.expires.id,
    },
  })

  async function onSubmit(data: InputsWithIndexSignature) {
    startTransition(async () => {
      try {
        const formData = new FormData()

        // append data
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key])
        })

        // append image
        if (data.image) {
          formData.append("image", data.image)
        }

        const response = await updateKnowledge({
          token: session?.user?.token,
          idKnowledge: knowledge.id_knowledge.toString(),
          body: formData,
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Materi berhasil diubah",
          })

          router.back()
          router.refresh()
        } else {
          sonnerToast.error("Gagal", {
            description: "Materi gagal diubah",
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
                  placeholder="Judul Materi"
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
                    if (e.target.files) {
                      form.setValue("image", e.target.files[0])
                      setSelectedImage(URL.createObjectURL(e.target.files[0]))
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                Gambar ini opsional, jika tidak diisi maka akan menggunakan
                gambar default
              </FormDescription>
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
                alt={knowledge.knowledge_title}
                width="0"
                height="0"
                sizes="100vw"
                className="h-auto w-full rounded-lg"
              />
            </Zoom>
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="Status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
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
                          ? reference.data.find(
                              (content) => content.code_ref2 === field.value
                            )?.value_ref1
                          : "Pilih Status"}
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
              <FormMessage />
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
                        disabled={isPending}
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
                          : "Pilih "}
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
          name="UpdatedBy"
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
          {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  )
}
