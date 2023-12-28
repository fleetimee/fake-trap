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
import { UserOneResData } from "@/types/user/res"
import { updateUser } from "@/lib/fetcher/users-fetcher"
import { cn } from "@/lib/utils"
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

import { Icons } from "../icons"
import { Badge } from "../ui/badge"

interface ErrorResponseProps {
  message: string
}

type Inputs = z.infer<typeof usersSchema>

interface UpdateUsersFormProps {
  roleOptions: RoleListResData[]
  user: UserOneResData
}

export function UpdateUserForm({ roleOptions, user }: UpdateUsersFormProps) {
  type RoleNovian = z.infer<typeof usersSchema.shape.role>

  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(usersSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      created_by: user.created_by,
      role: user.role,
    },
  })

  const [selectedRole, setSelectedRole] = React.useState<RoleNovian>(user.role)

  React.useEffect(() => {
    form.setValue("role", selectedRole)
  }, [form, selectedRole])

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const response = await updateUser({
          token: session?.user.token,
          uuid: user.uuid,
          body: JSON.stringify(data),
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "User berhasil diupdate",
          })

          router.back()
          router.refresh()
          form.reset()
        } else {
          const errorResponse: ErrorResponseProps = await response.json()

          sonnerToast.error("Gagal", {
            description: errorResponse.message,
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
                <Input {...field} placeholder="Masukkan username" />
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
                Role <span className="text-red-500">*</span>
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
                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50 [&_svg]:invisible"
                                )}
                              >
                                <CheckIcon className={cn("h-4 w-4")} />
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
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Update
        </Button>
      </form>
    </Form>
  )
}
