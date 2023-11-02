"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
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
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  id_course: z.string(),
  status: z.string(),
  comment: z.string(),
  user_uuid_request: z.string(),
})

interface CourseRequestFormProps {
  idCourse: string
  uuid: string
}

export function CourseRequestForm({ idCourse, uuid }: CourseRequestFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_course: idCourse,
      status: "0051",
      comment: "",
      user_uuid_request: uuid,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (res.ok) {
        toast({
          title: "Berhasil",
          description: "Pelatihan berhasil diajukan",
        })

        form.reset()
        router.push("/dashboard/course")
        router.refresh()
      } else {
        toast({
          title: "Gagal",
          description: "Pelatihan gagal diajukan",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Pelatihan gagal diajukan",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-4"
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
                  placeholder="Komentar untuk pengajuan"
                  className="w-full"
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Masukkan komentar untuk pengajuan pelatihan yang diajukan dan
                akan dikirimkan ke supervisor
              </FormDescription>
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
          <Button
            type="submit"
            className={cn(isLoading && "cursor-not-allowed opacity-50")}
            disabled={isLoading}
          >
            {isLoading ? (
              <Icons.spinner className="h-5 w-5 animate-spin" />
            ) : (
              "Approve"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
