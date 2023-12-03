"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { CourseOneRes } from "@/types/course/res"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  id_course: z.number(),
  threads_title: z
    .string()
    .nonempty({ message: "Judul thread tidak boleh kosong." }),
})

interface CreateThreadButtonProps {
  courseDataResp: CourseOneRes
}

export function CreateThreadButton({
  courseDataResp,
}: CreateThreadButtonProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_course: courseDataResp.data.id_course,
      threads_title: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/threads/`,
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
        sonnerToast.success("Berhasil", {
          description: "Thread berhasil dibuat.",
        })

        router.refresh()
        setOpen(false)
        form.reset()
      } else {
        sonnerToast.error("Gagal", {
          description: "Thread gagal dibuat.",
        })
      }
    } catch (e) {
      sonnerToast.error("Gagal", {
        description: `${e}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="col-span-1 font-heading">Buat Thread</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Thread</DialogTitle>
          <DialogDescription>
            Buat thread baru untuk pelatihan ini.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <FormField
              control={form.control}
              name="threads_title"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-between gap-2">
                  <FormLabel>
                    Topik
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-32 w-full resize-none"
                      placeholder="Tulis judul thread disini..."
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Judul thread tidak boleh kosong.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
                type="button"
              >
                Batal
              </Button>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                ) : (
                  "Tambah"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
