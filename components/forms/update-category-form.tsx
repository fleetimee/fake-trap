"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { CategoryOneResData } from "@/types/category/res"
import { ErrorResponse } from "@/types/error-res"
import { updateCategory } from "@/lib/fetcher/category-fetcher"
import { updateCategorySchema } from "@/lib/validations/category"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
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
import { Zoom } from "@/components/zoom-image"

interface UpdateCategoryFormProps {
  category: CategoryOneResData
}

type Inputs = z.infer<typeof updateCategorySchema>

type InputsWithIndexSignature = Inputs & { [key: string]: any }

export default function UpdateCategoryForm({
  category,
}: UpdateCategoryFormProps) {
  const [selectedImage, setSelectedImage] = useState(
    `${process.env.NEXT_PUBLIC_BASE_URL}${category.image}`
  )

  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<InputsWithIndexSignature>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      CategoryName: category.category_name,
      CreatedBy: session?.expires.id,
    },
  })

  async function onSubmit(data: InputsWithIndexSignature) {
    startTransition(async () => {
      try {
        const formData = new FormData()

        Object.keys(data).forEach((key) => {
          formData.append(key, data[key])
        })

        const response = await updateCategory({
          token: session?.user?.token,
          idCategory: category.id_category.toString(),
          body: formData,
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Modul berhasil diubah",
          })

          router.back()
          router.refresh()
        } else {
          const errorResponse: ErrorResponse = await response.json()

          sonnerToast.error("Gagal", {
            description: errorResponse.error,
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal", {
          description: "Modul gagal diubah",
        })
      } finally {
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
          name="CategoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Modul</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nama Modul"
                  disabled={isPending}
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
                <Input
                  type="file"
                  disabled={isPending}
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
                alt={category.category_name}
                width={200}
                height={200}
                className="rounded-md"
              />
            </Zoom>
          </FormControl>
        </FormItem>

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Update
        </Button>
      </form>
    </Form>
  )
}
