"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  quiz_title: z
    .string({
      required_error: "Judul kuis harus diisi",
    })
    .nonempty()
    .max(36, {
      message: "Judul kuis maksimal 36 karakter",
    })
    .nonempty({
      message: "Judul kuis harus diisi",
    }),
  quiz_desc: z
    .string({
      required_error: "Deskripsi kuis harus diisi",
    })
    .nonempty()
    .max(1000)
    .nonempty({
      message: "Deskripsi kuis harus diisi",
    }),
  quiz_type: z.number({
    required_error: "Tipe kuis harus dipilih",
  }),
})

export function CreateQuizSheet() {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quiz_title: "",
      quiz_desc: "",
      quiz_type: 1,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/quiz`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
        }
      )

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Kuis berhasil dibuat",
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        toast({
          title: "Gagal",
          description: "Kuis gagal dibuat",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Kuis gagal dibuat",
        variant: "destructive",
      })

      console.error(error)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger></SheetTrigger>
    </Sheet>
  )
}
