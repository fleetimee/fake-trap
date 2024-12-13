"use client"

import { useEffect, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { authSchema } from "@/lib/validations/auth"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type Inputs = z.infer<typeof authSchema>

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [isCaptchaVerified, setCaptchaVerified] = useState(false)

  const searchParams = useSearchParams()

  const router = useRouter()

  const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
    return match ? match[2] : "0"
  }

  const setCookie = (name: string, value: string) => {
    const date = new Date()
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000) // 1 day
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
  }

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  }

  const checkIfBlocked = () => {
    const attempts = parseInt(getCookie("failed_attempts"))
    return attempts >= 3
  }

  useEffect(() => {
    setIsBlocked(checkIfBlocked())
  }, [])

  const handleFailedAttempt = () => {
    const attempts = parseInt(getCookie("failed_attempts")) + 1
    setCookie("failed_attempts", attempts.toString())

    if (attempts >= 3) {
      setIsBlocked(true)
      deleteCookie("failed_attempts")
      router.push("/login/forgot-password")
      sonnerToast.error("Terlalu Banyak Percobaan", {
        description: "Anda telah mencoba 3 kali. Silakan reset password Anda.",
      })
      return false
    }
    return true
  }

  async function onSubmit(data: Inputs) {
    if (isBlocked) {
      sonnerToast.error("Akun Diblokir", {
        description: "Silakan reset password Anda terlebih dahulu.",
      })
      router.push("/login/forgot-password")
      return
    }

    startTransition(async () => {
      setIsLoading(true)

      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: searchParams.get("from") || "/",
        redirect: false,
      }).then((res) => {
        if (!res?.ok) {
          setIsLoading(false)

          if (!handleFailedAttempt()) {
            return
          }

          sonnerToast.error("Perhatian", {
            description: `${res?.error}`,
          })
        } else {
          setIsLoading(false)
          deleteCookie("failed_attempts") // Reset attempts on successful login

          const loginTime = new Date().getTime()
          localStorage.setItem("_loginTime", loginTime.toString())

          router.push("/login")

          router.refresh()

          sonnerToast.success("Berhasil", {
            description: "Anda berhasil masuk",
          })
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-6"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        {isBlocked && (
          <div className="border-2 border-red-950 bg-red-50 p-4 text-sm font-bold text-red-950 shadow-[4px_4px_0px_0px_rgba(127,29,29,1)]">
            Akun Anda diblokir. Silakan reset password untuk melanjutkan.
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-blue-950">Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Tuliskan email"
                  className="border-2 border-blue-950 bg-white p-6 text-lg font-medium placeholder:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                />
              </FormControl>
              <FormMessage className="font-medium text-red-700" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-blue-950">
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="**********"
                  className="border-2 border-blue-950 bg-white p-6 text-lg font-medium placeholder:text-blue-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-medium text-red-700" />
            </FormItem>
          )}
        />

        <ReCAPTCHA
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
          disabled={isLoading || !isCaptchaVerified || isBlocked}
          className="border-2 border-blue-950 bg-blue-600 p-6 text-lg font-bold text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] disabled:opacity-50"
        >
          {isLoading && (
            <Icons.spinner
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          LOG IN
          <span className="sr-only">LOG IN</span>
        </Button>
      </form>
    </Form>
  )
}
