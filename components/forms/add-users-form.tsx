"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ReferenceListRes } from "@/types/references/res"
import { cn } from "@/lib/utils"
import { testSchema } from "@/lib/validations/test"
import { usersSchema } from "@/lib/validations/users"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"

import { Icons } from "../icons"

type Inputs = z.infer<typeof usersSchema>

interface ErrorResponseProps {
  error: string
}

export function AddUserForm() {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(usersSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      created_by: session?.expires.id,
    },
  })

  const name = form.watch("name")

  React.useEffect(() => {
    if (name) {
      const words = name.split(" ")
      let username = ""
      if (words.length >= 3) {
        username = `${words[0]}.${words[words.length - 1]}`
      } else {
        username = words.join(".")
      }
      form.setValue("username", username.toLowerCase())
    }
  }, [name, form])

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users`

        const response = await fetch(url, {
          method: "POST",
          headers: {
            ContentType: "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "User berhasil dibuat",
          })

          router.back()
          router.refresh()
          form.reset()
        } else {
          const errorResponse: ErrorResponseProps = await response.json()

          sonnerToast.error("Gagal", {
            description: `${errorResponse.error}`,
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full max-w-2xl gap-5"
      >
        {/* <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormControl>
              <FormLabel htmlFor="name">Nama</FormLabel>
              <Input
                {...field}
                id="name"
                placeholder="Nama"
                className="w-full"
              />
              <FormMessage />
            </FormControl>
          )}
        /> */}

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nama Lengkap <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Masukkan nama lengkap"
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukkan username" disabled />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Masukkan email"
                  disabled={isPending}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
