"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import { z } from "zod"

import { ErrorResponse } from "@/types/error-res"
import {
  courseSectionSchema,
  knowledgeSectionSchema,
} from "@/lib/validations/section"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Icons } from "../icons"

type Inputs = z.infer<typeof courseSectionSchema>

export function AddCourseSectionForm() {
  const { data: session } = useSession()

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(courseSectionSchema),
    defaultValues: {
      section: [{ section_title: "" }],
    },
  })
}
