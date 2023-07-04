"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { CategoryResponse } from "@/types/category-res"
import { KnowledgeData } from "@/types/knowledge-res"
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
import { statusTypes } from "@/components/app/knowledge/create-knowledge-button"
import { Icons } from "@/components/icons"

/**
 * Defines a zod schema for the form data used in the CreateKnowledgeButton component.
 * The schema defines the shape and validation rules for the form data.
 */
const formSchema = z.object({
  knowledge_title: z.string().min(2).max(40).nonempty(),
  description: z.string().min(2).max(4000).nonempty(),
  status: z.number().int(),
  image: z.string().optional(),
  id_category: z.number().int(),
})

export function EditKnowledgeButton(props: {
  item: KnowledgeData
  category: CategoryResponse
  token: string | undefined
}) {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knowledge_title: props.item.knowledge_title,
      description: props.item.description,
      status: props.item.status,
      image: props.item.image,
      id_category: props.item.id_category,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${props.item.id_knowledge}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        toast({
          title: "Pengetahuan berhasil diubah",
          description: "Pengetahuan berhasil diubah",
        })

        router.refresh()
        setOpen(false)
        form.reset()
      } else {
        toast({
          title: "Pengetahuan gagal diubah",
          description: "Pengetahuan gagal diubah",
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="secondary" className="mr-2">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="content">
        <SheetHeader>
          <SheetTitle>Ubah Pengetahuan</SheetTitle>
          <SheetDescription>Ubah pengetahuan yang sudah ada.</SheetDescription>
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
                  <FormLabel>Judul Pengetahuan</FormLabel>
                  <FormControl>
                    <Input placeholder="Pendahuluan" {...field} />
                  </FormControl>
                  <FormDescription>
                    Judul pengetahuan yang ingin diubah.
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
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Berikan sedikit deskripsi tentang pengetahuan yang ingin dibuat"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Deskripsi pengetahuan yang ingin diubah
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
                    Link gambar pengetahuan yang ingin diubah.
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
                  <FormLabel>Kategori</FormLabel>
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
                              ? props.category.data.find(
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
                            {props.category.data.map((category) => (
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
                "Ubah"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
