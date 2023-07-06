"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { DataCategory } from "@/types/category-res"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

const formSchema = z.object({
  category_name: z.string().nonempty().min(3).max(36),
})

export function EditCategorySheet(props: { kategori: DataCategory }) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: props.kategori.category_name,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/category/${props.kategori.id_category}`,
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
          title: "Success",
          description: "Kategori berhasil diubah",
        })

        router.refresh()
        form.reset()

        setOpen(false)
      } else {
        toast({
          title: "Error",
          description: "Kategori gagal diubah",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Kategori gagal diubah",
      })

      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <SheetTrigger>
        <DropdownMenuItem className="w-full">Edit Kategori</DropdownMenuItem>
      </SheetTrigger>
      <SheetContent size="content">
        <SheetHeader>
          <SheetTitle>Tambah Kategori</SheetTitle>
          <SheetDescription>
            Tambahkan kategori baru untuk pengelompokan Pengetahuan
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 py-8"
          >
            <FormField
              control={form.control}
              name="category_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nama Kategori <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Kategori" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nama Kategori yang akan ditambahkan
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
    </>
  )
}
