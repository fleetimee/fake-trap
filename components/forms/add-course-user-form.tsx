"use client"

import React, { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, ChevronDown, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { CourseVacantUserListResData } from "@/types/course/res"
import { ErrorResponse } from "@/types/error-res"
import { updateCoursePeserta } from "@/lib/fetcher/course-fetcher"
import { cn } from "@/lib/utils"
import { addCourseUserSchema } from "@/lib/validations/course"

import { Icons } from "../icons"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ScrollArea } from "../ui/scroll-area"

type Inputs = z.infer<typeof addCourseUserSchema>

type userId = z.infer<typeof addCourseUserSchema.shape.users>

interface AddCourseUserFormProps {
  userLists: CourseVacantUserListResData[]
  idCourse: number
}

export function AddCourseUserForm({
  userLists,
  idCourse,
}: AddCourseUserFormProps) {
  const [selectedUsers, setSelectedUsers] = useState<userId>([])

  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(addCourseUserSchema),
    defaultValues: {
      users: [],
    },
  })

  React.useEffect(() => {
    form.setValue("users", selectedUsers)
  }, [form, selectedUsers])

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await updateCoursePeserta({
          idCourse: idCourse.toString(),
          body: JSON.stringify(data),
          token: session?.user?.token,
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description: "Peserta berhasil ditambahkan",
          })

          router.refresh()
          form.reset()
        } else {
          const error: ErrorResponse = await res.json()

          sonnerToast.error("Gagal", {
            description: error.error,
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
          control={form.control}
          name="users"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pilih Peserta <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <div
                        className={`relative flex min-h-[36px] items-center justify-end rounded-md border data-[state=open]:border-ring ${
                          isPending ? "cursor-not-allowed" : ""
                        }`}
                      >
                        <div className="relative flex min-h-[36px] flex-wrap items-center justify-end rounded-md ">
                          {selectedUsers.length > 0 ? (
                            userLists &&
                            userLists
                              .filter((user) =>
                                selectedUsers
                                  .map((user) => user.uuid)
                                  .includes(user.user_uuid)
                              )
                              .map((user) => (
                                <Badge
                                  key={user.user_uuid}
                                  className="m-[2px] gap-1 pr-0.5"
                                  variant="default"
                                >
                                  <span className="">{user.name}</span>
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault()

                                      setSelectedUsers((prev) => {
                                        const next = [...prev]

                                        const index = next.findIndex(
                                          (item) => item.uuid === user.user_uuid
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
                          {selectedUsers.length > 0 && (
                            <div
                              onClick={(e) => {
                                e.preventDefault()
                                setSelectedUsers([])
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
                    className="h-[300px] w-[var(--radix-popover-trigger-width)] p-0"
                    align="start"
                  >
                    <Command>
                      <CommandInput placeholder="Search..." className="h-9" />
                      <CommandList>
                        <CommandEmpty>No Result Found</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-full">
                            {userLists.map((option, index) => {
                              const isSelected = selectedUsers.some(
                                (user) => user.uuid === option.user_uuid
                              )

                              return (
                                <CommandItem
                                  key={index}
                                  onSelect={() => {
                                    if (isSelected) {
                                      setSelectedUsers((prev) => {
                                        const next = [...prev]

                                        const index = next.findIndex(
                                          (item) =>
                                            item.uuid === option.user_uuid
                                        )

                                        next.splice(index, 1)
                                        return next
                                      })
                                    } else {
                                      setSelectedUsers((prev) => [
                                        ...prev,
                                        {
                                          uuid: option.user_uuid,
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
                                  <span>{option.name}</span>
                                </CommandItem>
                              )
                            })}
                          </ScrollArea>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Pilih peserta yang akan ditambahkan ke dalam pelatihan ini.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  )
}
