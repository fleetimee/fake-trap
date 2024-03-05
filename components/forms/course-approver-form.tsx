"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleIcon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import { updateCourseApproval } from "@/lib/fetcher/approval-fetcher"
import { courseApproveFormSchema } from "@/lib/validations/approver-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Textarea } from "../ui/textarea"

type Inputs = z.infer<typeof courseApproveFormSchema>

interface ApproverCourseFormProps {
  idApproval: string
}

export function ApproverCourseForm({ idApproval }: ApproverCourseFormProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const [isPending, setTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(courseApproveFormSchema),
    defaultValues: {
      status: "",
      comment: "",
      user_uuid_approver: session?.expires?.id,
      approved_at: new Date(),
    },
  })

  async function onSubmit(data: Inputs) {
    setTransition(async () => {
      try {
        const res = await updateCourseApproval({
          token: session?.user?.token,
          idApproval: idApproval,
          body: JSON.stringify(data),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil mengubah status approval")

          router.back()
          router.refresh()
          form.reset()
        } else {
          const error: ErrorResponse = await res.json()

          sonnerToast.error(error.error)
        }
      } catch (e) {
        sonnerToast.error(`Terjadi kesalahan: ${e}`)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-2xl gap-8"
      >
        <FormField
          control={form.control}
          name="status"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={(value) => {
                  form.setValue("status", value)

                  if (value === "0052") {
                    form.setValue("approved_at", new Date())
                  }
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status">
                      {field.value === "0051" ? (
                        <div className="flex items-center space-x-2">
                          <CircleIcon className="size-5 text-yellow-500" />
                          <span>Menunggu Konfirmasi</span>
                        </div>
                      ) : field.value === "0052" ? (
                        <div className="flex items-center space-x-2">
                          <CircleIcon className="size-5 text-green-500" />
                          <span>DITERIMA</span>
                        </div>
                      ) : field.value === "0053" ? (
                        <div className="flex items-center space-x-2">
                          <CircleIcon className="size-5 text-red-500" />
                          <span>DITOLAK</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <CircleIcon className="size-5 text-red-500" />
                          <span>Pilih Status</span>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0053">TOLAK</SelectItem>
                  <SelectItem value="0052">TERIMA</SelectItem>
                </SelectContent>
              </Select>
              {field.value === "0052" ? (
                <FormDescription>
                  Status pengajuan diterima dan status materi akan berubah
                  menjadi DITERIMA dan materi akan ditampilkan di halaman Materi
                </FormDescription>
              ) : field.value === "0053" ? (
                <FormDescription>
                  Status pengajuan ditolak dan status materi akan berubah
                  menjadi DITOLAK dan akan dikembalikan kembali ke pengaju untuk
                  direvisi
                </FormDescription>
              ) : (
                <span></span>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          disabled={isPending}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catatan</FormLabel>
              <Textarea
                {...field}
                placeholder="Tulis komentar"
                className="h-24"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Kirim
        </Button>
      </form>
    </Form>
  )
}
