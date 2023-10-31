"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
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
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  id_knowledge: z.string(),
  status: z.string(),
  comment: z.string().optional(),
  user_uuid_request: z.string(),
})

interface KnowledgeRequestFormProps {
  idKnowledge: string
  uuid: string
}

export function KnowledgeRequestForm({
  idKnowledge,
  uuid,
}: KnowledgeRequestFormProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_knowledge: idKnowledge,
      status: "0051",
      comment: "",
      user_uuid_request: uuid,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/knowledge`,
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
          description: "Pengetahuan berhasil diajukan",
        })

        form.reset()
        router.push("/dashboard/knowledge")
        router.refresh()
      } else {
        toast({
          title: "Gagal",
          description: "Pengetahuan gagal diajukan",
        })
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "Pengetahuan gagal diajukan",
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
              <FormLabel>Komentar Untuk Pengajuan</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Komentar untuk pengajuan"
                  className="w-full"
                  disabled={isLoading}
                />
              </FormControl>
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
            className="space-y-20 self-end"
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
