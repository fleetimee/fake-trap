"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Turnstile } from "@marsidev/react-turnstile"
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

  async function onSubmit(data: Inputs) {
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

          sonnerToast.error("Perhatian", {
            description: `${res?.error}`,
          })
        } else {
          setIsLoading(false)

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
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="novian.andika@bpddiy.co.id"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
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

        <Button type="submit" disabled={isLoading || !isCaptchaVerified}>
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
