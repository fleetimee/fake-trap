"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, ChevronDown, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { RoleListResData } from "@/types/role/res"
import { createUser } from "@/lib/fetcher/users-fetcher"
import { cn } from "@/lib/utils"
import { usersSchema } from "@/lib/validations/users"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
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

interface ErrorResponseProps {
  error: string
}

type Inputs = z.infer<typeof usersSchema>

interface AddUserFormProps {
  roleOptions: RoleListResData[]
}

export function AddUserForm({ roleOptions }: AddUserFormProps) {
  type RoleNovian = z.infer<typeof usersSchema.shape.role>

  const [selectedRole, setSelectedRole] = React.useState<RoleNovian>([
    {
      id_role: 5,
    },
  ])

  const { data: session } = useSession()

  console.log("session", session)

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(usersSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      created_by: session?.expires.id,
      // Default roke to 1 (peserta)
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

  React.useEffect(() => {
    form.setValue("role", selectedRole)
  }, [form, selectedRole])

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/users/`

        const response = await createUser({
          token: session?.user?.token,
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
                <Input
                  {...field}
                  placeholder="Masukkan username"
                  disabled={isPending}
                />
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

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Kewenangan <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div className="relative flex min-h-[36px] items-center justify-end rounded-md border data-[state=open]:border-ring">
                        <div className="relative flex min-h-[36px] flex-wrap items-center justify-end rounded-md ">
                          {selectedRole.length > 0 ? (
                            roleOptions &&
                            roleOptions
                              .filter((role) =>
                                selectedRole
                                  .map((role) => role.id_role)
                                  .includes(role.id_role)
                              )
                              .map((role) => (
                                <Badge
                                  key={role.id_role}
                                  className="m-[2px] gap-1 pr-0.5"
                                  variant="default"
                                >
                                  <span className="">{role.role_name}</span>
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault()

                                      setSelectedRole((prev) => {
                                        const next = [...prev]

                                        const index = next.findIndex(
                                          (item) =>
                                            item.id_role === role.id_role
                                        )

                                        next.splice(index, 1)
                                        return next
                                      })
                                    }}
                                    className="flex items-center rounded-sm px-[1px] hover:bg-accent hover:text-red-500"
                                  >
                                    <X size={14} />
                                  </span>
                                </Badge>
                              ))
                          ) : (
                            <span className="mr-auto text-sm">Select...</span>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center self-stretch px-1 text-muted-foreground/60">
                          {selectedRole.length > 0 && (
                            <div
                              onClick={(e) => {
                                e.preventDefault()
                                setSelectedRole([])
                              }}
                              className="flex items-center self-stretch p-2 hover:text-red-500"
                            >
                              <X size={16} />
                            </div>
                          )}
                          <span className="mx-0.5 my-2 w-[1px] self-stretch bg-border" />
                          <div className="flex items-center self-stretch p-2 hover:text-muted-foreground">
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-[var(--radix-popover-trigger-width)] p-0"
                    align="start"
                  >
                    <Command>
                      <CommandInput placeholder="Search..." className="h-9" />
                      <CommandEmpty>No Result Found</CommandEmpty>
                      <CommandGroup>
                        {roleOptions.map((option, index) => {
                          const isSelected = selectedRole.some(
                            (role) => role.id_role === option.id_role
                          )

                          return (
                            <CommandItem
                              key={index}
                              onSelect={() => {
                                if (isSelected) {
                                  setSelectedRole((prev) => {
                                    const next = [...prev]

                                    const index = next.findIndex(
                                      (item) => item.id_role === option.id_role
                                    )

                                    next.splice(index, 1)
                                    return next
                                  })
                                } else {
                                  setSelectedRole((prev) => [
                                    ...prev,
                                    {
                                      id_role: option.id_role,
                                    },
                                  ])
                                }
                              }}
                            >
                              <div
                                className={cn(
                                  "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50 [&_svg]:invisible"
                                )}
                              >
                                <CheckIcon className={cn("size-4")} />
                              </div>
                              <span>{option.role_name}</span>
                            </CommandItem>
                          )
                        })}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Batasi akses user dengan memilih role yang sesuai
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="created_by"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Dibuat Oleh <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Masukkan created_by" disabled />
              </FormControl>
              <FormDescription>
                Ini adalah unique identier dari user yang membuat user baru ini.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-fit">
          {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
          Tambah
        </Button>
      </form>
    </Form>
  )
}
