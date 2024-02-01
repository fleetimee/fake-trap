"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Turnstile } from "@marsidev/react-turnstile"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { forgotPassword } from "@/lib/fetcher/password-fetcher"
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

  const [isCaptchaVerified, setCaptchaVerified] = useState(false)

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
        const response = await forgotPassword({
          email: data.email,
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

        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
          className="h-12 w-full"
          onSuccess={async (token) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/verifyTurnstile`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: token,
                }),
              }
            )

            if (response.ok) {
              setCaptchaVerified(true)
            } else {
              sonnerToast.error("Perhatian", {
                description: "Captcha tidak valid",
              })
            }
          }}
        />

        <Button type="submit" disabled={isPending || !isCaptchaVerified}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Continue
        </Button>
      </form>
    </Form>
  )
}
