"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { KnowledgeByIdSectionContentData } from "@/types/knowledge-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"
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
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const contentTypes = [
  { value: 1, label: "Video" },
  { value: 2, label: "File" },
  { value: 3, label: "Link" },
  { value: 4, label: "Text" },
] as const

/**
 * Defines the schema for the knowledge content form.
 */
const formSchema = z.object({
  content_title: z.string().min(2).max(40).nonempty(),
  content_type: z.number().int(),
  image: z.string().optional(),
  link: z.string().optional(),
  id_section: z.number().int(),
})

/**
 * EditSectionContentSheet component is responsible for rendering a form to edit a knowledge content.
 * @param {Object} props - The props object containing the item to be edited.
 * @param {KnowledgeByIdSectionContentData} props.item - The knowledge content to be edited.
 * @returns {JSX.Element} - The JSX element representing the form to edit the knowledge content.
 */
export function EditSectionContentSheet(props: {
  item: KnowledgeByIdSectionContentData
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  /**
   * Initializes the form with default values and validation schema.
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content_title: props.item.content_title,
      content_type: props.item.content_type,
      image: props.item.image,
      link: props.item.link,
      id_section: props.item.id_section,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/${props.item.id_content}`,
        {
          method: "PUT",
          headers: headersObj,
          body: JSON.stringify(values),
        }
      )

      console.log(response)

      if (response.ok) {
        toast({
          title: "Berhasil mengubah konten",
          description: "Konten berhasil diubah",
        })

        router.refresh()
        form.reset()
        props.setOpen(false)
      } else {
        toast({
          title: "Gagal mengubah konten",
          description: "Konten gagal diubah",
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SheetContent size="content">
      <SheetHeader>
        <SheetTitle>Edit Konten</SheetTitle>
        <SheetDescription>Ubah konten yang ingin kamu ubah.</SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 py-8"
        >
          <FormField
            control={form.control}
            name="content_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Konten</FormLabel>
                <FormControl>
                  <Input placeholder="Sejarah Javascript" {...field} />
                </FormControl>
                <FormDescription>Judul konten anda.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipe Konten</FormLabel>
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
                            ? contentTypes.find(
                                (content) => content.value === field.value
                              )?.label
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Tipe konten..." />
                        <CommandEmpty>Konten tidak ditemukan</CommandEmpty>
                        <CommandGroup>
                          {contentTypes.map((language) => (
                            <CommandItem
                              value={language.value.toString()}
                              key={language.value}
                              onSelect={(value) => {
                                form.clearErrors("content_type")
                                form.setValue("content_type", parseInt(value))
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
                <FormDescription>Pilih tipe konten anda.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("content_type") === 1 ? (
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Youtube</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Link video Youtube.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : form.watch("content_type") === 2 ? (
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Gambar</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://pbs.twimg.com/media/FzDiHrSWIAAQYx9?format=jpg&name=small"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Link gambar.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

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
  )
}
