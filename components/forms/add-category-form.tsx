"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { createCategory } from "@/lib/fetcher/category-fetcher"
import { categorySchema } from "@/lib/validations/category"
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

type Inputs = z.infer<typeof categorySchema>

type InputsWithIndexSignature = Inputs & { [key: string]: any }

export function AddCategoryForm() {
  const [preview, setPreview] = useState<string | null>(null)

  const { data: session } = useSession()

  const [isLoading, setIsloading] = useState(false)

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      CategoryName: "",
      image: new File([], ""),
      CreatedBy: session?.expires.id,
    },
  })

  async function onSubmit(data: InputsWithIndexSignature) {
    setIsloading(true)

    try {
      const formData = new FormData()

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
      })

      const response = await createCategory({
        token: session?.user?.token,
        body: formData,
      })

      if (response.ok) {
        sonnerToast.success("Berhasil", {
          description: "Kategori berhasil ditambahkan",
        })

        router.back()
        router.refresh()
        form.reset()
      } else {
        sonnerToast.error("Gagal", {
          description: "Kategori gagal ditambahkan",
        })
      }
    } catch (error) {
    } finally {
      setIsloading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full max-w-2xl gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="CategoryName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nama Kategori <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Tuliskan nama kategori"
                  {...field}
                  disabled={isLoading}
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
                  type="file"
                  placeholder="Masukkan link gambar"
                  accept="image/*"
                  disabled={isLoading}
                  className="h-10 resize-none"
                  onChange={(e) => {
                    if (e.target.files) {
                      form.setValue("image", e.target.files[0])

                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setPreview(reader.result as string)
                      }
                      reader.readAsDataURL(e.target.files[0])
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Preview</FormLabel>
          <FormControl>
            {preview && (
              <Zoom>
                <Image
                  src={preview}
                  alt="Picture of the author"
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              </Zoom>
            )}
          </FormControl>
        </FormItem>

        <FormField
          control={form.control}
          name="CreatedBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Dibuat Oleh <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} disabled />
              </FormControl>
              <FormDescription>
                Ini adalah unique identifier dari user yang membuat tes
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Simpan
        </Button>
      </form>
    </Form>
  )
}
