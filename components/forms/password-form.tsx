"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import * as z from "zod"

import { changePassword } from "@/lib/fetcher/password-fetcher"
import { changePasswordSchema } from "@/lib/validations/change-password"

import { Icons } from "../icons"
import { PasswordInput } from "../password-input"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

type Inputs = z.infer<typeof changePasswordSchema>

interface ErrorResponseProps {
  error: string
}

export function ChangePasswordForm() {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const response = await changePassword({
          token: session?.user.token,
          uuid: session?.expires.id,
          body: JSON.stringify(data),
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Password berhasil diubah",
          })

          router.refresh()
          form.reset()
        } else {
          const error: ErrorResponseProps = await response.json()

          sonnerToast.error("Gagal", {
            description: `${error.error}`,
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal", {
          description: `${error}`,
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="old_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Lama</FormLabel>
              <FormControl>
                {/* <Input
                  placeholder=""
                  {...field}
                  disabled={isPending}
                  type="password"
                /> */}

                <PasswordInput {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>
                Masukkan password lama anda untuk memvalidasi perubahan
                password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Baru</FormLabel>
              <FormControl>
                {/* <Input
                  placeholder=""
                  {...field}
                  disabled={isPending}
                  type="password"
                /> */}

                <PasswordInput {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>Masukkan password baru anda.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi Password Baru</FormLabel>
              <FormControl>
                <PasswordInput {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>
                Masukkan password baru anda sekali lagi untuk konfirmasi.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-fit">
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Update
        </Button>
      </form>
    </Form>
  )
}
