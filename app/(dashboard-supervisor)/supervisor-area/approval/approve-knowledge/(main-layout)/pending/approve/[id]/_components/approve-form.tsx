"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  status: z.string(),
  comment: z.string().optional(),
  user_uuid_approver: z.string().optional(),
  approved_at: z.date(),
})

interface KnowledgeApprovalFormProps {
  id: string
  uuid: string
}

export function KnowledgeApprovalForm({
  id,
  uuid,
}: KnowledgeApprovalFormProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "0052",
      comment: "",
      user_uuid_approver: uuid,
      approved_at: new Date(),
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (res.ok) {
        sonnerToast.success("Berhasil", {
          description: "Pengajuan berhasil diapprove.",
        })

        form.reset()
        router.push(
          "/supervisor-area/approval/approve-knowledge/pending?page=1"
        )
        router.refresh()
      } else {
        sonnerToast.error("Gagal", {
          description: "Pengajuan gagal diapprove.",
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
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="approved_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Approve</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={isLoading}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pilih tanggal mulai</span>
                      )}
                      <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    className="w-full"
                    mode="single"
                    onSelect={(day: Date | undefined) => {
                      if (day) {
                        field.onChange(day)
                      }
                    }}
                    selected={field.value}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Tanggal Approve untuk pengajuan ini
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user_uuid_approver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Approver Identifier</FormLabel>
              <FormControl>
                <Input
                  disabled
                  {...field}
                  placeholder="User UUID Approver"
                  value={session?.expires.id}
                />
              </FormControl>
              <FormDescription>Ini merupakan UUID mu</FormDescription>
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
              "Approve"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
