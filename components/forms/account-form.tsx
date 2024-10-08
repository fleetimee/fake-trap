"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import * as z from "zod"

import { UserOneResData } from "@/types/user/res"
import { updateNameUser, updateUser } from "@/lib/fetcher/users-fetcher"
import { accountSchema } from "@/lib/validations/account"
import { Icons } from "@/components/icons"
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

type Inputs = z.infer<typeof accountSchema>

interface AccountFormProps {
  person: UserOneResData
}

export function AccountForm({ person }: AccountFormProps) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: person?.name,
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const response = await updateNameUser({
          token: session?.user.token,
          uuid: person.uuid,
          body: JSON.stringify(data),
        })

        if (response.ok) {
          sonnerToast.success("Berhasil mengubah profile")

          router.refresh()
        } else {
          sonnerToast.error("Gagal mengubah profile")
        }
      } catch (error) {
        sonnerToast.error("Gagal mengubah profile")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>
                Nama lengkap anda yang akan ditampilkan secara publik.
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
