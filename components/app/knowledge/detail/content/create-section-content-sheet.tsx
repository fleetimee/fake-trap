import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z.object({
  content_title: z
    .string({
      required_error: "Judul konten harus diisi",
    })
    .max(40, {
      message: "Judul konten tidak boleh lebih dari 40 karakter",
    })
    .nonempty({ message: "Judul konten tidak boleh kosong" }),
  content_type: z
    .number({
      required_error: "Tipe konten harus diisi",
    })
    .int({
      message: "Tipe konten harus berupa angka",
    }),
  image: z.string().optional(),
  link: z.string().optional(),
  id_section: z.number().int(),
})

interface CreateSectionContentSheetProps {
  id_section: number
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function CreateSectionContentSheet({
  id_section,
  open,
  setOpen,
}: CreateSectionContentSheetProps) {
  const { data: session } = useSession()

  const router = useRouter()
  const [isLoading, setIsloading] = React.useState<boolean>(false)

  // Define the form using react-hook-form and zod.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content_title: "",
      content_type: 1,
      image: "",
      link: "",
      id_section: id_section,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsloading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        toast({
          title: "Konten berhasil dibuat",
          description: "Konten berhasil dibuat",
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        throw new Error("Gagal membuat konten")
      }
    } catch (error) {
      toast({
        title: "Gagal membuat konten",
        description: "Gagal membuat konten",
        variant: "destructive",
      })
    } finally {
      setIsloading(false)
    }
  }

  return (
    <SheetContent size="content">
      <SheetHeader>
        <SheetTitle>Tambah Konten</SheetTitle>
        <SheetDescription>
          Tambah konten baru ke dalam bagian ini.
        </SheetDescription>
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
                <FormLabel>
                  Judul Konten <span className="text-red-500">*</span>
                </FormLabel>
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
                <FormLabel>
                  Tipe Konten <span className="text-red-500">*</span>
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
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Pdf</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://pbs.twimg.com/media/FzDiHrSWIAAQYx9?format=jpg&name=small"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Link ekstensi pdf.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : form.watch("content_type") === 3 ? (
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormDescription>Link Eksternal</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : form.watch("content_type") === 4 ? (
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Gambar</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormDescription>Url Gambar</FormDescription>
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
