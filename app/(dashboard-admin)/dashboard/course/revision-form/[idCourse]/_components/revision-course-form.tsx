"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

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
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  status: z.string(),
  comment: z.string(),
  user_uuid_request: z.string(),
})

interface CourseRevisionFormProps {
  idApproval: string
}

export function CourseRevisionForm({ idApproval }: CourseRevisionFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState(false)

  const uuid: string = session?.expires.id as string

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "0051",
      user_uuid_request: session?.expires.id as string,
      comment: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course/revision/${idApproval}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (res.ok) {
        sonnerToast.success("Berhasil", {
          description: "Revisi Pelatihan Berhasil Diajukan",
        })

        form.reset()
        router.push("/dashboard/course")
        router.refresh()
      } else {
        sonnerToast.error("Gagal", {
          description: "Revisi Pelatihan Gagal Diajukan",
        })
      }
    } catch (error) {
      sonnerToast.error("Gagal", {
        description: `${error}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-2xl gap-8"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Komentar</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Komentar"
                  className="h-24 w-full resize-none"
                />
              </FormControl>
              <FormDescription>Komentar untuk pengajuan ini</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid w-full grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              router.back()
            }}
          >
            Kembali
          </Button>
          <Button type="submit" className="space-y-20 self-end">
            {isLoading ? (
              <Icons.spinner className="h-5 w-5 animate-spin" />
            ) : (
              "Revisi"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
