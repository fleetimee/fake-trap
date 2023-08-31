import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { KnowledgeOneResSection } from "@/types/knowledge/res"
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
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  section_title: z
    .string({
      required_error: "Judul section harus diisi",
    })
    .max(18, {
      message: "Judul section tidak boleh lebih dari 18 karakter",
    })
    .nonempty({
      message: "Judul section tidak boleh kosong",
    }),
})

interface EditSectionProps {
  item: KnowledgeOneResSection
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function EditSectionSheet({ item, open, setOpen }: EditSectionProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsloading] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      section_title: item.section_title,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setIsloading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section/${item.id_section}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          method: "PUT",
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        toast({
          title: "Section berhasil diubah",
          description: "Section berhasil diubah",
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        toast({
          title: "Section gagal diubah",
          description: "Section gagal diubah",
        })
      }
    } catch (error) {
      toast({
        title: "Section gagal diubah",
        description: "Section gagal diubah",
      })

      console.log(error)
    } finally {
      setIsloading(false)
    }
  }

  return (
    <SheetContent size="content">
      <SheetHeader>Edit Section</SheetHeader>
      <SheetDescription>Ubah nama sectionmu disini</SheetDescription>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 py-8"
        >
          <FormField
            control={form.control}
            name="section_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Judul Section <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pendahuluan"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>Judul section anda.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
