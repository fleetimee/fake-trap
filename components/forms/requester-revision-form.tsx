"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CalendarIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  FileTextIcon,
  UpdateIcon,
} from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import * as z from "zod"

import { ErrorResponse } from "@/types/error-res"
import { revisionKnowledgeApproval } from "@/lib/fetcher/approval-fetcher"
import {
  approveFormSchema,
  revisionFormSchema,
} from "@/lib/validations/approver-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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

type Inputs = z.infer<typeof revisionFormSchema>

interface RequesterRevisionFormProps {
  idApproval: string
}

export function RequesterRevisionForm({
  idApproval,
}: RequesterRevisionFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(revisionFormSchema),
    defaultValues: {
      status: "0051",
      comment: "",
      user_uuid_request: session?.expires?.id,
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await revisionKnowledgeApproval({
          token: session?.user?.token,
          idApproval: idApproval,
          body: JSON.stringify(data),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description:
              "Pengajuan berhasil direvisi, silahkan tunggu persetujuan selanjutnya",
          })

          router.back()
          router.refresh()
          form.reset()
        } else {
          const error: ErrorResponse = await res.json()

          sonnerToast.error("Gagal", {
            description: `${error.error}`,
          })
        }
      } catch (e) {
        sonnerToast.error("Gagal", {
          description: `${e}`,
        })
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <UpdateIcon className="h-4 w-4 text-purple-500" />
                Status Revisi
              </FormLabel>
              <Select disabled value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-50">
                    <SelectValue>
                      {field.value === "0051" && (
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-yellow-500" />
                          <span>PENDING</span>
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
              <FormDescription className="ml-6 text-sm text-blue-600">
                Status akan kembali ke PENDING untuk ditinjau ulang
              </FormDescription>
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
              <FormLabel className="flex items-center gap-2">
                <FileTextIcon className="h-4 w-4 text-purple-500" />
                Catatan Revisi
              </FormLabel>
              <Textarea
                {...field}
                placeholder="Tuliskan revisi berdasarkan feedback..."
                className="min-h-[150px] rounded-lg border-gray-200 bg-gray-50 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-3 text-white transition-all hover:from-purple-700 hover:to-purple-600"
              disabled={isPending}
            >
              <UpdateIcon className="h-4 w-4" />
              Submit Revisi
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-xl font-semibold">
                <CheckCircledIcon className="h-5 w-5 text-green-500" />
                Konfirmasi Revisi
              </AlertDialogTitle>
              <AlertDialogDescription>
                Pengajuan akan direvisi dan dikirim kembali ke pengaju pastikan
                data yang di revisi sudah sesuai dengan kebutuhan dan arahan
                dari supervisor
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-3">
              <AlertDialogCancel className="flex items-center gap-2">
                <CrossCircledIcon className="h-4 w-4" />
                Batal
              </AlertDialogCancel>
              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isPending}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                {isPending ? (
                  <Icons.spinner className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircledIcon className="h-4 w-4" />
                )}
                Ya, Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  )
}
