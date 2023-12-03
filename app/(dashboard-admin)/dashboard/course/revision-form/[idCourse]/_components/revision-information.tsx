"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ApprovalCourseOneRes } from "@/types/approval/res"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"





interface CourseRevisionFormProps {
  approval: ApprovalCourseOneRes
}

const formSchemaView = z.object({
  comment: z.string(),
  course_name: z.string(),
  user_approver: z.string(),
})

export function RevisionInformation({ approval }: CourseRevisionFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchemaView),
    defaultValues: {
      comment: approval.data?.comment,
      course_name: approval.data?.course_name,
      user_approver: approval.data?.user_approver,
    },
  })

  return (
    <Form {...form}>
      <form className="grid grid-cols-1 gap-4 space-y-2">
        <FormField
          name="course_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Pelatihan</FormLabel>
              <Input
                {...field}
                disabled
                className="w-full"
                value={approval.data?.course_name}
              />
              <FormDescription>
                Ini adalah nama dari pelatihan yang telah direvisi
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alasan Revisi</FormLabel>
              <Textarea
                {...field}
                disabled
                className="w-full"
                value={approval.data?.comment}
              />
              <FormDescription>
                Ini adalah alasan dari revisi pelatihan yang telah direvisi
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
                Ini adalah supervisor yang merevisi pelatihan
              </FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
