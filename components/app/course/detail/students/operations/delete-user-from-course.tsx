"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

const formSchema = z.object({
  users: z.array(
    z.object({
      uuid: z.string().nonempty(),
    })
  ),
})

export function DeleteStudentsOutOfCourseButton(props: { uuid: string }) {
  const { data: session } = useSession()

  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [{ uuid: props.uuid }],
    },
  })

  const parts = pathname.split("/")

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${parts[3]}/users`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        sonnerToast.success("Berhasil", {
          description: "User berhasil dihapus dari pelatihan ini.",
        })

        router.refresh()

        setOpen(false)
      } else {
        sonnerToast.error("Gagal", {
          description: "User gagal dihapus dari pelatihan ini.",
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: "User gagal dihapus dari pelatihan ini.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button type="submit" className="w-full" variant="destructive">
          {isLoading ? (
            <Icons.spinner className="h-5 w-5 animate-spin" />
          ) : (
            "Hapus"
          )}
        </Button>
      </form>
    </Form>
  )
}
