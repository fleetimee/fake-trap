"use client"

import * as process from "process"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import * as z from "zod"

import { ErrorResponse } from "@/types/error-res"
import { UserListResData } from "@/types/user/res"
import { createCourseApproval } from "@/lib/fetcher/approval-fetcher"
import { cn } from "@/lib/utils"
import { requestCourseSchema } from "@/lib/validations/request"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

type Inputs = z.infer<typeof requestCourseSchema>

interface RequestCourseFormProps {
  idCourse: string
  supervisors: UserListResData[]
  requestUuid: string
  baseUrl: string
}

export function RequestCourseForm({
  idCourse,
  supervisors,
  requestUuid,
  baseUrl,
}: RequestCourseFormProps) {
  const { data: session } = useSession()

  const [isPending, startTransition] = useTransition()

  const firstSupervisor = supervisors.find(
    (supervisor) => supervisor.atasan === "1"
  )

  const router = useRouter()

  const form = useForm<Inputs>({
    resolver: zodResolver(requestCourseSchema),
    defaultValues: {
      id_course: idCourse,
      status: "0051",
      comment: "",
      user_uuid_request: requestUuid,
      user_uuid_approver: firstSupervisor?.uuid || "",
    },
  })

  async function onSubmit(data: Inputs) {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/secure/approval/course`

    startTransition(async () => {
      try {
        const res = await createCourseApproval({
          token: session?.user.token,
          body: JSON.stringify(data),
        })

        if (res.ok) {
          sonnerToast.success("Success", {
            description: "Permintaan pembelajaran berhasil diajukan",
          })

          router.push(baseUrl)
          router.refresh()
          form.reset()
        } else {
          const errorResponse: ErrorResponse = await res.json()

          sonnerToast.error("Error", {
            description: errorResponse.error,
          })
        }
      } catch (e) {
        sonnerToast.error("Error", {
          description: `Something went wrong: ${e}`,
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-8"
      >
        <FormField
          control={form.control}
          name="user_uuid_approver"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Atasan <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={isPending}
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? supervisors.find(
                              (supervisor) => supervisor.uuid === field.value
                            )?.name
                          : "Pilih Supervisor"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className=" w-[var(--radix-popover-trigger-width)] p-0 xl:w-[620px]">
                    <Command>
                      <CommandInput placeholder="Cari Pemateri" />

                      <CommandList>
                        <CommandEmpty>Supervisor tidak ditemukan</CommandEmpty>

                        <CommandGroup>
                          <ScrollArea className="h-full">
                            {supervisors.map((supervisor) => (
                              <CommandItem
                                value={supervisor.name}
                                key={supervisor.uuid}
                                onSelect={(value) => {
                                  form.clearErrors("user_uuid_approver")
                                  form.setValue(
                                    "user_uuid_approver",
                                    supervisor.uuid
                                  )
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    supervisor.uuid === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {supervisor.name}
                              </CommandItem>
                            ))}
                          </ScrollArea>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormDescription>
                Atasan yang dipilih akan menerima permintaan pengajuan
                pembelajaran
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="comment">Komentar</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  id="comment"
                  placeholder="Komentar"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                Komentar yang diberikan akan dikirimkan ke pemateri
              </FormDescription>
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-fit">
          {isPending && <Icons.spinner className="animate-spin" />}
          Kirim
        </Button>
      </form>
    </Form>
  )
}
