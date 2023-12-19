"use client"

import React, { useEffect, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, ChevronDown, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { CourseVacantUserListResData } from "@/types/course/res"
import { ErrorResponse } from "@/types/error-res"
import { KnowledgeListResData } from "@/types/knowledge/res"
import { UserListResData } from "@/types/user/res"
import { assignKnowledgeToCourse } from "@/lib/fetcher"
import { cn } from "@/lib/utils"
import {
  addCourseKnowledgeSchema,
  addCourseUserSchema,
} from "@/lib/validations/course"

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

type Inputs = z.infer<typeof addCourseKnowledgeSchema>

type knowledgeId = z.infer<typeof addCourseKnowledgeSchema.shape.knowledge>

interface AddCourseKnowledgeFormProps {
  knowledges: KnowledgeListResData[]
  idCourse: number
}

export function AddCourseKnowledgeForm({
  idCourse,
  knowledges,
}: AddCourseKnowledgeFormProps) {
  const [selectedKnowledge, setSelectedKnowledge] = useState<knowledgeId>([])

  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(addCourseKnowledgeSchema),
    defaultValues: {
      knowledge: [],
    },
  })

  React.useEffect(() => {
    form.setValue("knowledge", selectedKnowledge)
  }, [form, selectedKnowledge])

  async function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        const res = await assignKnowledgeToCourse({
          token: session?.user.token,
          idCourse: idCourse.toString(),
          body: JSON.stringify(data),
        })

        if (res.ok) {
          sonnerToast.success("Berhasil", {
            description: "Materi berhasil ditambahkan ke dalam pelatihan",
          })

          router.back()
          router.refresh()
          form.reset()
        } else {
          const error: ErrorResponse = await res.json()

          sonnerToast.error("Gagal menambahkan materi ke dalam pelatihan", {
            description: error.error,
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal menambahkan materi ke dalam pelatihan", {
          description: `Terjadi kesalahan: ${error}`,
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
          name="knowledge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Pilih Materi <span className="text-red-500">*</span>
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
                          {selectedKnowledge.length > 0 ? (
                            knowledges &&
                            knowledges
                              .filter((knowledge) =>
                                selectedKnowledge
                                  .map((knowledge) =>
                                    knowledge.id_knowledge.toString()
                                  )
                                  .includes(knowledge.id_knowledge.toString())
                              )
                              .map((knowledge) => (
                                <Badge
                                  key={knowledge.id_knowledge}
                                  className="m-[2px] gap-1 pr-0.5"
                                  variant="default"
                                >
                                  <span className="">
                                    {knowledge.knowledge_title}
                                  </span>
                                  <span
                                    onClick={(e) => {
                                      e.preventDefault()

                                      setSelectedKnowledge((prev) => {
                                        const next = [...prev]

                                        const index = next.findIndex(
                                          (item) =>
                                            Number(item.id_knowledge) ===
                                            knowledge.id_knowledge
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
                          {selectedKnowledge.length > 0 && (
                            <div
                              onClick={(e) => {
                                e.preventDefault()
                                setSelectedKnowledge([])
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
                            {knowledges.map((option, index) => {
                              const isSelected = selectedKnowledge.some(
                                (knowledge) =>
                                  Number(knowledge.id_knowledge) ===
                                  option.id_knowledge
                              )

                              return (
                                <CommandItem
                                  key={index}
                                  onSelect={() => {
                                    if (isSelected) {
                                      setSelectedKnowledge((prev) => {
                                        const next = [...prev]

                                        const index = next.findIndex(
                                          (item) =>
                                            Number(item.id_knowledge) ===
                                            option.id_knowledge
                                        )

                                        next.splice(index, 1)
                                        return next
                                      })
                                    } else {
                                      setSelectedKnowledge((prev) => [
                                        ...prev,
                                        {
                                          id_knowledge: option.id_knowledge,
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
                                  <span>{option.knowledge_title}</span>
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
                Pilih materi yang akan ditambahkan ke dalam pelatihan
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
