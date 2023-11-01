"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ApprovalOneRes } from "@/types/approval/res"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface KnowledgeRevisionFormProps {
  approval: ApprovalOneRes
}

const formSchemaView = z.object({
  comment: z.string(),
  knowledge_title: z.string(),
  user_approver: z.string(),
})

export function RevisionInformation({ approval }: KnowledgeRevisionFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchemaView),
    defaultValues: {
      comment: approval.data?.comment,
      knowledge_title: approval.data?.knowledge_title,
      user_approver: approval.data?.user_approver,
    },
  })

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 gap-4 space-y-2">
        <FormField
          name="knowledge_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Pengetahuan</FormLabel>
              <Input
                {...field}
                disabled
                className="w-full"
                value={approval.data?.knowledge_title}
              />
              <FormDescription>
                Ini adalah judul dari pengetahuan yang telah direvisi
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name=""
          render={({ field }) => (
            <FormItem>
              <FormLabel>Komentar</FormLabel>
              <Textarea
                {...field}
                disabled
                className="w-full"
                rows={3}
                value={approval.data?.comment}
              />
              <FormDescription>
                Ini merupakan komentar dari supervisor yang telah merevisi
                pengetahuan
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="user_approver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supervisor</FormLabel>
              <Input
                {...field}
                disabled
                className="w-full"
                value={approval.data?.user_approver}
              />
              <FormDescription>
                Ini adalah supervisor yang telah merevisi pengetahuan
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
