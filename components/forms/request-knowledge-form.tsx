"use client"

import { useState, useTransition } from "react"
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
      <Card className="relative w-full overflow-hidden border-none bg-gradient-to-br from-white to-blue-50/50 shadow-lg">
        <CardHeader className="space-y-1 border-b border-blue-100/20 bg-white/50 backdrop-blur-sm">
          <CardTitle className="text-xl font-semibold tracking-tight text-blue-950">
            Pengajuan Permintaan
          </CardTitle>
          <CardDescription className="text-sm font-medium text-blue-600/80">
            Ajukan permintaan persetujuan materi kepada atasan Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="grid w-full gap-8"
            >
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="user_uuid_approver"
                  render={({ field }) => (
                    <FormItem className="transition-all duration-200 ease-in-out">
                      <FormLabel className="text-sm font-semibold uppercase tracking-wide text-blue-900">
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
                                  "w-full justify-between border-blue-200 bg-white/80 px-4 py-6 text-left font-normal backdrop-blur-sm transition-all duration-200",
                                  "hover:border-blue-300 hover:bg-blue-50/80",
                                  "focus:ring-2 focus:ring-blue-200 focus:ring-offset-0",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? supervisors.find(
                                      (supervisor) =>
                                        supervisor.uuid === field.value
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
                      <FormDescription className="text-xs text-blue-600/70">
                        Atasan yang dipilih akan menerima permintaan pengajuan
                        materi
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-6 bg-blue-100/50" />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold uppercase tracking-wide text-blue-900">
                        Komentar
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          id="comment"
                          placeholder="Masukkan komentar atau catatan tambahan disini..."
                          {...field}
                          className={cn(
                            "min-h-[120px] resize-none border-blue-200 bg-white/80 backdrop-blur-sm",
                            "focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-0",
                            "placeholder:text-gray-400"
                          )}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-blue-600/70">
                        Komentar yang diberikan akan dikirimkan ke approver
                        pemateri
                      </FormDescription>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isPending}
                  className={cn(
                    "min-w-[140px] gap-2",
                    "bg-gradient-to-r from-blue-600 to-blue-500",
                    "hover:from-blue-700 hover:to-blue-600",
                    "transition-all duration-200 ease-in-out",
                    "shadow-md hover:shadow-lg",
                    "text-sm font-medium"
                  )}
                >
                  {isPending && (
                    <Icons.spinner className="size-4 animate-spin" />
                  )}
                  <span>Ajukan Persetujuan</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold text-blue-950">
              Konfirmasi Pengajuan
            </DialogTitle>
            <DialogDescription className="text-center text-blue-600/80">
              Apakah Anda yakin ingin mengajukan permintaan persetujuan materi
              ini?
            </DialogDescription>
          </DialogHeader>
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
                <p className="text-sm font-medium text-blue-900">Komentar:</p>
                <p className="text-sm text-gray-600">{formData.comment}</p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-blue-200 hover:bg-blue-50/50 hover:text-blue-600"
            >
              Batal
            </Button>
            <Button
              disabled={isPending}
              onClick={() => formData && onSubmit(formData)}
              className={cn(
                "min-w-[100px] gap-2",
                "bg-gradient-to-r from-blue-600 to-blue-500",
                "hover:from-blue-700 hover:to-blue-600"
              )}
            >
              {isPending && <Icons.spinner className="size-4 animate-spin" />}
              <span>Konfirmasi</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
