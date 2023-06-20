"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, set, useForm } from "react-hook-form"
import { z } from "zod"

import { KnowledgeByIdSectionContentData } from "@/types/knowledge-res"
import { AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { CreateButton } from "./create-button"
import { Icons } from "./icons"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

/**
 * Defines the schema for the knowledge content form.
 */
const formSchema = z.object({
  content_title: z.string().min(2).max(18).nonempty(),
  content_type: z.number().int(),
  image: z.string().url().optional(),
  link: z.string().url().optional(),
  id_section: z.number().int(),
})

/**
 * Renders a button to create knowledge content.
 *
 * @returns A React component that displays a button to create knowledge content.
 */
export function CreateKnowledgeContentButton() {
  const router = useRouter()
  const [isLoading, setIsloading] = React.useState<boolean>(false)

  // Define the form using react-hook-form and zod.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content_title: "",
      content_type: 1,
      image: "",
      link: "",
      id_section: 1,
    },
  })

  // Render the sheet content.
  return (
    <SheetContent size="sm">
      <SheetHeader>
        <SheetTitle>Are you sure absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  )
}
