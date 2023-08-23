"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { CategoryResponse } from "@/types/category-res"
import { CategoryListRes } from "@/types/category/res"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { CreateButton } from "@/components/create-button"
import { Icons } from "@/components/icons"

interface CreateKnowledgeButtonProps {
  categoryResponse: CategoryListRes
  token: string | undefined
}

export const statusTypes = [
  { value: 1, label: "Public" },
  { value: 2, label: "Private" },
]

const formSchema = z.object({
  knowledge_title: z
    .string({
      required_error: "Judul pengetahuan harus diisi",
    })
    .max(40, {
      message: "Judul pengetahuan maksimal 40 karakter",
    })
    .nonempty({
      message: "Judul pengetahuan harus diisi",
    }),
  description: z
    .string({
      required_error: "Deskripsi pengetahuan harus diisi",
    })
    .max(4000)
    .nonempty({
      message: "Deskripsi pengetahuan harus diisi",
    }),
  status: z
    .number({
      required_error: "Status pengetahuan harus diisi",
    })
    .int({
      message: "Status pengetahuan harus diisi",
    }),
  image: z.string().optional(),
  id_category: z
    .number({
      required_error: "Kategori pengetahuan harus diisi",
    })
    .int({
      message: "Kategori pengetahuan harus diisi",
    }),
})

export function CreateKnowledgeButton({
  categoryResponse,
  token,
}: CreateKnowledgeButtonProps) {
  const router = useRouter()

  const [isLoading, setIsloading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knowledge_title: "",
      description: "",
      image: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsloading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        toast({
          title: "Pengetahuan berhasil dibuat",
          description: "Pengetahuan berhasil dibuat",
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        throw new Error("Gagal membuat pengetahuan")
      }
    } catch (error) {
      toast({
        title: "Gagal membuat pengetahuan",
        description: "Gagal membuat pengetahuan",
        variant: "destructive",
      })
    } finally {
      setIsloading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <CreateButton
          className=" transition duration-300 delay-150 ease-in-out hover:-translate-y-1 hover:scale-110"
          name="Tambah"
        />
      </SheetTrigger>
      <SheetContent position="right" size="content">
        <SheetHeader>
          <SheetTitle>Tambah Pengetahuan</SheetTitle>
          <SheetDescription>
            Tambah pengetahuan baru untuk dipelajari oleh user.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 py-8"
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
                    <Input placeholder="Pendahuluan" {...field} />
                  </FormControl>
                  <FormDescription>
                    Judul pengetahuan yang ingin dibuat.
                  </FormDescription>
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
                    Deskripsi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Berikan sedikit deskripsi tentang pengetahuan yang ingin dibuat"
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
                      placeholder="https://avatars.githubusercontent.com/u/124599?s=48&v=4"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Link gambar pengetahuan yang ingin dibuat.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Status <span className="text-red-500">*</span>
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
                              ? statusTypes.find(
                                  (content) => content.value === field.value
                                )?.label
                              : "Pilih Status"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Tipe konten..." />
                          <CommandEmpty>Konten tidak ditemukan</CommandEmpty>
                          <CommandGroup>
                            {statusTypes.map((language) => (
                              <CommandItem
                                value={language.value.toString()}
                                key={language.value}
                                onSelect={(value) => {
                                  form.clearErrors("status")
                                  form.setValue("status", parseInt(value))
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {language.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Status pengetahuan yang ingin dibuat.
                  </FormDescription>
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
                    Kategori <span className="text-red-500">*</span>
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
                              ? categoryResponse.data.find(
                                  (category) =>
                                    category.id_category === field.value
                                )?.category_name
                              : "Pilih Kategori"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Jenis Kategori" />
                          <CommandEmpty>Kategori tidak ditemukan</CommandEmpty>
                          <CommandGroup>
                            {categoryResponse.data.map((category) => (
                              <CommandItem
                                value={category.id_category.toString()}
                                key={category.id_category}
                                onSelect={(value) => {
                                  form.clearErrors("id_category")
                                  form.setValue("id_category", parseInt(value))
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
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    Kategori pengetahuan yang ingin dibuat. jika belum ada
                    silahkan tambahkan{" "}
                    <Link
                      href="/dashboard/category"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-8"
                    >
                      disini
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="self-end">
              {isLoading ? (
                <Icons.spinner className="h-5 w-5 animate-spin" />
              ) : (
                "Tambah"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
