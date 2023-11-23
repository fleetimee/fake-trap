"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { forgotPasswordSchema } from "@/lib/validations/forgot-password"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

interface ErrorResponseProps {
  error: string
}

type Inputs = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/public/reset-password/${data.email}`

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Silahkan cek email anda untuk mengubah password",
          })

          router.refresh()
          form.reset()
        } else {
          const errorResponse: ErrorResponseProps = await response.json()

          sonnerToast.error("Gagal", {
            description: errorResponse.error,
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal", {
          description: "Terjadi kesalahan, silahkan coba lagi",
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  disabled={isPending}
                />
              </FormControl>
              <FormDescription>
                Email yang digunakan untuk login
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
