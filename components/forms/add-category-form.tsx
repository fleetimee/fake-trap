"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import {
  ErrorJsonResponse,
  ErrorResponse,
  ErrorResponseJson,
  SuccessResponse,
} from "@/types/error-res"
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

interface AddCategoryFormProps {
  userId?: string
}

export function AddCategoryForm({ userId }: AddCategoryFormProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const { data: session } = useSession()

  const [isLoading, setIsloading] = useState(false)

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      CategoryName: "",
      image: new File([], ""),
      CreatedBy: userId ? userId : session?.expires.id,
      UpdatedBy: userId ? userId : session?.expires.id,
    },
  })

  const validateImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return "File harus berupa gambar"
    }

    const fileSize = file.size / 1024 / 1024 // Convert to MB
    if (fileSize > 2) {
      return "Ukuran file tidak boleh lebih dari 2MB"
    }

    return true
  }

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

      const responseData = await response.json()

      if (response.ok) {
        sonnerToast.success(
          `Success ${response.status}: ${response.statusText}`,
          {
            description: responseData.message || "Modul berhasil ditambahkan",
          }
        )

        router.back()
        router.refresh()
        form.reset()
      } else {
        const errorData = responseData as ErrorJsonResponse
        sonnerToast.error(`Error ${response.status}`, {
          description: errorData.error || "Terjadi kesalahan",
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: `${error}`,
      })
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
                Nama Modul <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Tuliskan nama Modul"
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
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0]
                      const validationResult = validateImageFile(file)

                      if (validationResult === true) {
                        form.setValue("image", file)
                        form.clearErrors("image") // Clear any existing errors
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setPreview(reader.result as string)
                        }
                        reader.readAsDataURL(file)
                      } else {
                        form.setError("image", {
                          type: "manual",
                          message: validationResult,
                        })
                        e.target.value = "" // Clear the input
                        setPreview(null)
                      }
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                Gambar ini opsional, jika tidak diisi maka akan menggunakan
                gambar default. Maksimal ukuran file 2MB.
              </FormDescription>
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
          render={({ field }) => <Input type="hidden" {...field} disabled />}
        />

        <FormField
          control={form.control}
          name="UpdatedBy"
          render={({ field }) => <Input type="hidden" {...field} disabled />}
        />

        <Button type="submit" className="w-fit" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Simpan
        </Button>
      </form>
    </Form>
  )
}
