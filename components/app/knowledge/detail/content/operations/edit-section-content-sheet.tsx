import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { KnowledgeOneResContent } from "@/types/knowledge/res"
import { ReferenceListResData } from "@/types/references/res"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
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

const formSchema = z.object({
  content_title: z.string().min(2).max(40).nonempty(),
  content_type: z.string(),
  image: z.string().optional(),
  link: z.string().optional(),
  id_section: z.number().int(),
})

interface EditSectionContentSheetProps {
  item: KnowledgeOneResContent
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  contentTypeData: ReferenceListResData[]
}

export function EditSectionContentSheet({
  item,
  open,
  setOpen,
  contentTypeData,
}: EditSectionContentSheetProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content_title: item.content_title,
      content_type: item.content_type,
      image: item.image,
      link: item.link,
      id_section: item.id_section,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content/${item.id_content}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        sonnerToast.success("Berhasil", {
          description: "Konten berhasil diubah",
        })

        router.refresh()

        form.reset()
        setOpen(false)
      } else {
        sonnerToast.error("Gagal", {
          description: "Konten gagal diubah",
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: `Konten gagal diubah: ${error}`,
      })
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
                  <Input
                    placeholder="Sejarah Javascript"
                    {...field}
                    disabled={isLoading}
                  />
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
                          disabled={isLoading}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? contentTypeData.find(
                                (content) => content.code_ref2 === field.value
                              )?.value_ref1
                            : "Pilih tipe konten"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Tipe konten..." />
                        <CommandEmpty>Tipe konten tidak ditemukan</CommandEmpty>
                        <CommandGroup>
                          {contentTypeData.map((content) => (
                            <CommandItem
                              value={content.value_ref1}
                              key={content.id_ref}
                              onSelect={(value) => {
                                form.clearErrors("content_type")
                                form.setValue("content_type", content.code_ref2)

                                if (content.code_ref2 !== "0012") {
                                  form.setValue("link", "")
                                }

                                if (content.code_ref2 !== "0013") {
                                  form.setValue("link", "")
                                }

                                if (content.code_ref2 !== "0014") {
                                  form.setValue("link", "")
                                }

                                if (content.code_ref2 !== "0016") {
                                  form.setValue("link", "")
                                }

                                if (content.code_ref2 !== "0017") {
                                  form.setValue("link", "")
                                }

                                if (content.code_ref2 !== "0018") {
                                  form.setValue("link", "")
                                }
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
                <FormDescription>Pilih tipe konten anda.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("content_type") === "0012" ? (
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
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>Link video Youtube.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : form.watch("content_type") === "0013" ? (
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
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>Link ekstensi pdf.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : form.watch("content_type") === "0014" ? (
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>Link Eksternal</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : form.watch("content_type") === "0015" ? (
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Gambar</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>Url Gambar</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : form.watch("content_type") === "0017" ? (
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Gist Github</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://gist.github.com/mattetti/5914158/f4d1393d83ebedc682a3c8e7bdc6b49670083b84"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkkan link kode snippet dari{" "}
                    <Link
                      href={"https://gist.github.com/"}
                      target="_blank"
                      className="text-muted-foreground underline"
                    >
                      gist
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : form.watch("content_type") === "0018" ? (
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Codesandbox</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://codesandbox.io/embed/react-editorjs-example-ng6qzo?fontsize=14&hidenavigation=1&theme=dark"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkkan link kode snippet dari{" "}
                    <Link
                      href={"https://codesandbox.io/"}
                      target="_blank"
                      className="text-muted-foreground underline"
                    >
                      Codesandbox
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : form.watch("content_type") === "0016" ? (
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Soundcloud</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://soundcloud.com/soundcloud/sets/splash-house-2023"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkkan link kode snippet dari{" "}
                    <Link
                      href={"https://soundcloud.com/"}
                      target="_blank"
                      className="text-muted-foreground underline"
                    >
                      Soundcloud
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          <Button type="submit" className="self-end" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="h-5 w-5 animate-spin" />
            ) : (
              "Ubah"
            )}
          </Button>
        </form>
      </Form>
    </SheetContent>
  )
}
