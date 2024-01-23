"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Turnstile } from "@marsidev/react-turnstile"
import { signIn } from "next-auth/react"
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

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
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

  const email = useRef("")
  const password = useRef("")

  // async function onSubmit(event: SyntheticEvent) {
  //   event.preventDefault()
  //   setIsLoading(true)
  // }

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      setIsLoading(true)

      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: searchParams.get("from") || "/",
        redirect: false,
      }).then((res) => {
        console.log(res)

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
    // <div className={cn("grid gap-6", className)} {...props}>

    //   <form onSubmit={onSubmit}>
    //     <div className="grid gap-2 space-y-3">
    //       <div className="grid gap-4 pb-2">
    //         <Label htmlFor="email">Email</Label>
    //         <Input
    //           id="email"
    //           type="text"
    //           autoCapitalize="none"
    //           disabled={isLoading}
    //           onChange={(e) => {
    //             email.current = e.target.value
    //           }}
    //         />
    //       </div>
    //       <div className="grid gap-4 pb-2">
    //         <Label htmlFor="password">Password</Label>
    //         <Input
    //           id="password"
    //           placeholder=""
    //           type="password"
    //           autoCapitalize="none"
    //           disabled={isLoading}
    //           onChange={(e) => {
    //             password.current = e.target.value
    //           }}
    //         />
    //       </div>
    //       <Turnstile
    //         siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
    //         className="h-12 w-full"
    //         onSuccess={async (token) => {
    //           const response = await fetch(
    //             `${process.env.NEXT_PUBLIC_BASE_URL}/verifyTurnstile`,
    //             {
    //               method: "POST",
    //               headers: {
    //                 "Content-Type": "application/json",
    //               },
    //               body: JSON.stringify({
    //                 token: token,
    //               }),
    //             }
    //           )

    //           if (response.ok) {
    //             setCaptchaVerified(true)
    //           } else {
    //             sonnerToast.error("Perhatian", {
    //               description: "Captcha tidak valid",
    //             })
    //           }
    //         }}
    //       />

    //       <Button
    //         disabled={isLoading || !isCaptchaVerified} // Disable button if loading or captcha not verified
    //         onClick={() =>
    //           signIn("credentials", {
    //             email: email.current,
    //             password: password.current,
    //             callbackUrl: searchParams.get("from") || "/",
    //             redirect: false,
    //           }).then((res) => {
    //             console.log(res)

    //             if (!res?.ok) {
    //               setIsLoading(false)

    //               sonnerToast.error("Perhatian", {
    //                 description: `${res?.error}`,
    //               })
    //             } else {
    //               setIsLoading(false)

    //               router.push("/login")

    //               router.refresh()

    //               sonnerToast.success("Berhasil", {
    //                 description: "Anda berhasil masuk",
    //               })
    //             }
    //           })
    //         }
    //       >
    //         {isLoading && (
    //           <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
    //         )}
    //         Masuk
    //       </Button>
    //     </div>
    //   </form>
    // </div>

    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
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

        <Button type="submit" disabled={isLoading || !isCaptchaVerified}>
          {isLoading && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  )
}
