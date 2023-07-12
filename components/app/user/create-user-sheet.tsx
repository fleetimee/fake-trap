"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface ErrorResponseProps {
  error: string
}

const formSchema = z.object({
  username: z
    .string({
      required_error: "Nama harus diisi",
    })
    .nonempty({
      message: "Nama harus diisi",
    }),
  email: z
    .string({
      required_error: "Email harus diisi",
    })
    .nonempty({
      message: "Email harus diisi",
    })
    .email({
      message: "Email tidak valid",
    }),
  password: z
    .string({
      required_error: "Password harus diisi",
    })
    .min(8, {
      message: "Password minimal 8 karakter",
    })
    .nonempty({
      message: "Password harus diisi",
    }),
})

export function CreateUserSheet() {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/`,
        {
          method: "POST",
          headers: {
            Accept: "/",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          body: JSON.stringify(values),
          // mode: "no-cors",
        }
      )

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "User berhasil dibuat",
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        const errorResponse: ErrorResponseProps = await response.json()

        toast({
          title: "Gagal",
          description: `${errorResponse.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: "User gagal dibuat",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button className="ml-2">Tambah</Button>
      </SheetTrigger>
      <SheetContent size="content">
        <SheetHeader>
          <SheetTitle>Tambah User</SheetTitle>
          <SheetDescription>Tambah user baru mu disini</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 py-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="1337h4cker5" />
                  </FormControl>

                  <FormDescription>
                    Username yang akan digunakan untuk login
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="hello@bpd.co.id"
                      type="email"
                    />
                  </FormControl>
                  <FormDescription>Email yang akan digunakan</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" type="password" />
                  </FormControl>
                  <FormDescription>
                    Password yang akan digunakan untuk login
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="self-end">
              {isLoading ? (
                <Icons.spinner className="h-5 w-5 animate-spin" />
              ) : (
                "Tambah"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
