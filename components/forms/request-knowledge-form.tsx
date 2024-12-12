"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CheckCircledIcon,
  CrossCircledIcon,
  FileTextIcon,
  PersonIcon,
  UpdateIcon,
} from "@radix-ui/react-icons" // Add this import
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState<Inputs | null>(null)

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

  const handleFormSubmit = (data: Inputs) => {
    setFormData(data)
    setIsDialogOpen(true)
  }

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await createKnowledgeApproval({
          token: session?.user.token,
          body: JSON.stringify(data),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description:
              "Permintaan persetujuan materi telah berhasil diajukan",
          })

          router.push(baseUrl)
          router.refresh()
          form.reset()
          setIsDialogOpen(false)
        } else {
          const errorResponse: ErrorResponse = await res.json()

          sonnerToast.error("Gagal", {
            description:
              errorResponse.error ||
              "Terjadi kesalahan saat mengajukan permintaan",
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal", {
          description: "Terjadi kesalahan pada sistem",
        })
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="grid w-full max-w-2xl gap-8 p-6"
        >
          <FormField
            control={form.control}
            name="user_uuid_approver"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <PersonIcon className="h-4 w-4 text-purple-500" />
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
                          className="w-full justify-between rounded-lg border-gray-200 bg-gray-50 px-3 py-5 text-left font-normal focus:border-purple-500 focus:ring-purple-500"
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
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 shadow-lg xl:w-[620px]">
                      <Command className="border-none">
                        <CommandInput
                          placeholder="Cari Pemateri"
                          className="border-none"
                        />
                        <CommandList>
                          <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                            Supervisor tidak ditemukan
                          </CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-[200px]">
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
                                  className="transition-colors duration-200"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 size-4 text-blue-600",
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <FileTextIcon className="h-4 w-4 text-purple-500" />
                  Komentar
                </FormLabel>
                <Textarea
                  {...field}
                  placeholder="Tuliskan komentar atau catatan tambahan..."
                  className="min-h-[150px] rounded-lg border-gray-200 bg-gray-50 placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 px-8 py-3 text-white transition-all hover:from-purple-700 hover:to-purple-600"
                disabled={isPending}
              >
                <UpdateIcon className="h-4 w-4" />
                Ajukan Persetujuan
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-lg">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-xl font-semibold">
                  <CheckCircledIcon className="h-5 w-5 text-green-500" />
                  Konfirmasi Pengajuan
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Apakah Anda yakin ingin mengajukan permintaan persetujuan
                  materi ini?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-900">
                    Atasan yang dipilih:
                  </p>
                  <p className="text-sm text-gray-600">
                    {supervisors.find(
                      (supervisor) =>
                        supervisor.uuid === formData?.user_uuid_approver
                    )?.name || "Belum dipilih"}
                  </p>
                </div>
                {formData?.comment && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-blue-900">
                      Komentar:
                    </p>
                    <p className="text-sm text-gray-600">{formData.comment}</p>
                  </div>
                )}
              </div>
              <AlertDialogFooter className="gap-3">
                <AlertDialogCancel className="flex items-center gap-2">
                  <CrossCircledIcon className="h-4 w-4" />
                  Batal
                </AlertDialogCancel>
                <Button
                  onClick={() => formData && onSubmit(formData)}
                  disabled={isPending}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                >
                  {isPending ? (
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircledIcon className="h-4 w-4" />
                  )}
                  Ya, Ajukan
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </form>
      </Form>
    </>
  )
}
