"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ReferenceListRes } from "@/types/references/res"
import { cn } from "@/lib/utils"
import { knowledgeSchema } from "@/lib/validations/knowledge"
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
import { Textarea } from "@/components/ui/textarea"

type Inputs = z.infer<typeof knowledgeSchema>

interface AddKnowledgeFormProps {
  reference: ReferenceListRes
}

export function AddKnowledgeForm({ reference }: AddKnowledgeFormProps) {
  const { data: session } = useSession()

  const [open, setOpen] = React.useState(false)

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(knowledgeSchema),
    defaultValues: {
      knowledge_title: "",
      description: "",
      image: "",
      status: "",
      id_category: "",
      created_by: session?.expires.id,
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/knowledge`

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Pengetahuan berhasil ditambahkan",
          })

          router.back()
          router.refresh()
        } else {
          sonnerToast.error("Gagal", {
            description: "Pengetahuan gagal ditambahkan",
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal", {
          description: "Pengetahuan gagal ditambahkan",
        })
      } finally {
        form.reset()
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
          name="knowledge_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Judul Pengetahuan <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Tuliskan judul pengetahuan yang ingin dibuat"
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gambar</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Masukkan link gambar"
                  disabled={isPending}
                  className="h-5 resize-none"
                />
              </FormControl>
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
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
