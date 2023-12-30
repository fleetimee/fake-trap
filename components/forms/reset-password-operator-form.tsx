"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { UserOneResData } from "@/types/user/res"
import { forgotPassword } from "@/lib/fetcher/password-fetcher"
import { resetPasswordSchema } from "@/lib/validations/reset-password"
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
import { Input } from "@/components/ui/input"

import { Icons } from "../icons"

type Inputs = z.infer<typeof resetPasswordSchema>

interface ResetPasswordOperatorFormProps {
  person: UserOneResData
}

export function ResetPasswordOperatorForm({
  person,
}: ResetPasswordOperatorFormProps) {
  useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: person?.email,
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const response = await forgotPassword({
          email: data.email,
        })

        if (response.ok) {
          sonnerToast.success("Berhasil mengirim link reset password ke email")
          router.back()
        } else {
          sonnerToast.error("Gagal mengirim link reset password ke email")
        }
      } catch (error) {
        sonnerToast.error("Gagal mengirim link reset password ke email")
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-2xl gap-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Email" disabled />
              </FormControl>
              <FormDescription>
                Email yang digunakan untuk login
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
