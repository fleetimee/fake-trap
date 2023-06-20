"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, set, useForm } from "react-hook-form"
import { z } from "zod"

import { KnowledgeByIdSectionContentData } from "@/types/knowledge-res"
import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"
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
import { toast } from "./ui/use-toast"

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
export function CreateKnowledgeContentButton({
  id_section,
  open,
  setOpen,
}: {
  id_section: number
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
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
      id_section: id_section,
    },
  })

  /**
   * Submits the form data to create a new knowledge content.
   *
   * @param values The form data to be submitted.
   * @returns A Promise that resolves to the response of the POST request.
   */
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Set loading state to true.
    setIsloading(true)

    try {
      // Send a POST request to create a new knowledge content.
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/content`,
        {
          method: "POST",
          headers: headersObj,
          body: JSON.stringify(values),
        }
      )

      console.log(response)

      // If the response is OK, display a success toast and reset the form.
      if (response.ok) {
        toast({
          title: "Konten berhasil dibuat",
          description: "Konten berhasil dibuat",
          duration: 5000,
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        // If the response is not OK, throw an error.
        throw new Error("Gagal membuat konten")
      }
    } catch (error) {
      // If there is an error, display an error toast.
      toast({
        title: "Gagal membuat konten",
        description: "Gagal membuat konten",
        duration: 5000,
        variant: "destructive",
      })
    } finally {
      // Set loading state to false.
      setIsloading(false)
    }
  }

  // Render the sheet content.
  return (
    <SheetContent size="sm">
      <SheetHeader>
        <SheetTitle>Tambah Konten</SheetTitle>
        <SheetDescription>
          Tambah konten baru ke dalam bagian ini.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  )
}
