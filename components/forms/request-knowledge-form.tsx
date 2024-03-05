"use client"

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
import { createKnowledgeApproval } from "@/lib/fetcher/approval-fetcher"
import { cn } from "@/lib/utils"
import { requestKnowledgeSchema } from "@/lib/validations/request"
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

type Inputs = z.infer<typeof requestKnowledgeSchema>

interface RequestKnowledgeFormProps {
  idKnowledge: string
  requestUuid: string
  supervisors: UserListResData[]
  baseUrl: string
}

export function RequestKnowledgeForm({
  idKnowledge,
  requestUuid,
  supervisors,
  baseUrl,
}: RequestKnowledgeFormProps) {
  const { data: session } = useSession()
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const firstSupervisor = supervisors.find(
    (supervisor) => supervisor.atasan === "1"
  )

  const form = useForm<Inputs>({
    resolver: zodResolver(requestKnowledgeSchema),
    defaultValues: {
      id_knowledge: idKnowledge,
      status: "0051",
      comment: "",
      user_uuid_request: requestUuid,
      user_uuid_approver: firstSupervisor?.uuid || "",
    },
  })

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await createKnowledgeApproval({
          token: session?.user.token,
          body: JSON.stringify(data),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil mengajukan permintaan")

          router.push(baseUrl)
          router.refresh()
          form.reset()
        } else {
          const errorResponse: ErrorResponse = await res.json()

          sonnerToast.error("Gagal", {
            description: errorResponse.error,
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
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
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
                                    "mr-2 size-4",
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
                Atasan yang dipilih akan menerima permintaan pengajuan materi
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
