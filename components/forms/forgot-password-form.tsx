"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Turnstile } from "@marsidev/react-turnstile"
import ReCAPTCHA from "react-google-recaptcha"
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
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [isCaptchaVerified, setCaptchaVerified] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const startCooldown = () => {
    setCooldown(60)
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const response = await forgotPassword({
          email: data.email,
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description:
              "Silahkan cek email Anda untuk melanjutkan proses atur ulang password",
          })

          router.refresh()
          form.reset()
          startCooldown()
          // Reset ReCAPTCHA and its state
          recaptchaRef.current?.reset()
          setCaptchaVerified(false)
        } else {
          const errorResponse: ErrorResponseProps = await response.json()

          sonnerToast.error("Gagal", {
            description: errorResponse.error,
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal", {
          description:
            "Terjadi kesalahan sistem, silahkan coba beberapa saat lagi",
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
              <FormLabel className="font-bold text-blue-950">
                Alamat Email
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="Masukkan email Anda"
                  disabled={isPending || cooldown > 0}
                  className="border-2 border-blue-950 bg-white p-6 text-lg font-medium placeholder:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                />
              </FormControl>
              <FormDescription className="font-medium text-blue-700">
                Email yang terdaftar untuk akun Anda
              </FormDescription>
              <FormMessage className="font-medium text-red-700" />
            </FormItem>
          )}
        />

        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={async (token) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/verifyRecaptcha`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  event: {
                    token: token,
                    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                  },
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
          onExpired={() => setCaptchaVerified(false)}
        />

        <Button
          type="submit"
          disabled={isPending || !isCaptchaVerified || cooldown > 0}
          className="border-2 border-blue-950 bg-blue-600 p-6 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] disabled:opacity-50"
        >
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {cooldown > 0 ? `Tunggu ${cooldown} detik` : "Kirim"}
        </Button>
      </form>
    </Form>
  )
}
