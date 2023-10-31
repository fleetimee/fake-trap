"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { CategoryListRes, CategoryListResData } from "@/types/category/res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { ReferenceListRes } from "@/types/references/res"
import { cn } from "@/lib/utils"
import { statusTypes } from "@/components/app/knowledge/operations/create-knowledge-button"
import { Icons } from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

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
  status: z.string({
    required_error: "Status pengetahuan harus diisi",
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

interface DeleteKnowledgeProps {
  idKnowledge: number
  token: string | undefined
}

async function deleteKnowledge({ idKnowledge, token }: DeleteKnowledgeProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${idKnowledge}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (response.ok) {
    toast({
      title: "Berhasil menghapus pengetahuan",
      description: "Pengetahuan berhasil dihapus",
      variant: "default",
    })

    return true
  } else {
    toast({
      title: "Gagal menghapus pengetahuan",
      description: "Pengetahuan gagal dihapus",
      variant: "destructive",
    })

    return false
  }
}

interface KnowledgeOperationsProps {
  knowledgeData: KnowledgeListResData
  categoryRes: CategoryListRes
  referenceResp: ReferenceListRes
}

export function KnowledgeOperations({
  knowledgeData,
  categoryRes,
  referenceResp,
}: KnowledgeOperationsProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const [openEditKnowledgeSheet, setOpenEditKnowledgeSheet] =
    React.useState<boolean>(false)
  const [openDeleteKnowledgeAlert, setOpenDeleteKnowledgeAlert] =
    React.useState<boolean>(false)

  const [isEditLoading, setIsEditLoading] = React.useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      knowledge_title: knowledgeData.knowledge_title,
      description: knowledgeData.description,
      status: knowledgeData.status,
      image: knowledgeData.image,
      id_category: knowledgeData.id_category,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsEditLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge/${knowledgeData.id_knowledge}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        toast({
          title: "Berhasil mengubah pengetahuan",
          description: "Pengetahuan berhasil diubah",
          variant: "default",
        })

        router.refresh()
        setOpenEditKnowledgeSheet(false)
      } else {
        toast({
          title: "Gagal mengubah pengetahuan",
          description: "Pengetahuan gagal diubah",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Gagal mengubah pengetahuan",
        description: "Pengetahuan gagal diubah",
        variant: "destructive",
      })
    } finally {
      setIsEditLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            disabled={
              knowledgeData.status_code === "0051" ||
              knowledgeData.status_code === "0052" ||
              knowledgeData.status_code === "0053"
            }
            onSelect={() => {
              router.push(
                `/dashboard/knowledge/request-form/${knowledgeData.id_knowledge}`
              )
            }}
          >
            Ajukan
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(
                knowledgeData.id_knowledge.toString()
              )
              toast({
                title: "Berhasil",
                description: "ID Kategori berhasil dicopy",
              })
            }}
          >
            Copy
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center
            "
            onSelect={() => setOpenEditKnowledgeSheet(true)}
          >
            Edit
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex  items-center "
            onSelect={() => setOpenDeleteKnowledgeAlert(true)}
          >
            Hapus
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog
        open={openDeleteKnowledgeAlert}
        onOpenChange={setOpenDeleteKnowledgeAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin menghapus pengetahuan ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Pengetahuan yang dihapus tidak dapat dikembalikan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Tidak</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault()
                setIsDeleteLoading(true)
                const deleted = await deleteKnowledge({
                  idKnowledge: knowledgeData.id_knowledge,
                  token: session?.user.token,
                })

                if (deleted) {
                  setIsDeleteLoading(false)
                  setOpenDeleteKnowledgeAlert(false)
                  router.refresh()
                } else {
                  setIsDeleteLoading(false)
                }
              }}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Hapus</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Sheet
        open={openEditKnowledgeSheet}
        onOpenChange={setOpenEditKnowledgeSheet}
      >
        <SheetContent position="right" size="content">
          <SheetHeader>
            <SheetTitle>Ubah Pengetahuan</SheetTitle>
            <SheetDescription>
              Ubah pengetahuan yang sudah ada.
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
                      <Input
                        placeholder="Pendahuluan"
                        {...field}
                        disabled={isEditLoading}
                      />
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
                    <FormLabel>
                      Deskripsi <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Berikan sedikit deskripsi tentang pengetahuan yang ingin dibuat"
                        className="resize-none"
                        disabled={isEditLoading}
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
                        disabled={isEditLoading}
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
                                ? referenceResp.data.find(
                                    (content) =>
                                      content.code_ref2 === field.value
                                  )?.value_ref1
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
                              {referenceResp.data.map((content) => (
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
                                ? categoryRes.data.find(
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
                            <CommandEmpty>
                              Kategori tidak ditemukan
                            </CommandEmpty>
                            <CommandGroup>
                              {categoryRes.data.map((category) => (
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
                {isEditLoading ? (
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                ) : (
                  "Ubah"
                )}
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  )
}
