"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { headersObj } from "@/lib/fetcher/knowledge/knowledge-fetcher"
import { Button } from "@/components/ui/button"
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
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { CreateButton } from "@/components/create-button"
import { Icons } from "@/components/icons"

/**
 * Defines a schema for the form data used to create a new section in the knowledge sidebar.
 */
const formSchema = z.object({
  section_title: z.string().min(2).max(18).nonempty(),
  knowledge: z.array(
    z.object({
      id_knowledge: z.number().int(),
    })
  ),
})

export function CreateSectionButton({
  id_knowledge,
}: {
  id_knowledge: number
}) {
  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  /**
   * Initializes a form using the `useForm` hook from `react-hook-form` library.
   * The form uses the `zodResolver` from `@hookform/resolvers/zod` to validate the form data.
   * @returns An object containing the form instance.
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      section_title: "",
      knowledge: [{ id_knowledge: id_knowledge }],
    },
  })

  /**
   * Submits the form data to create a new section in the knowledge sidebar.
   * @param values The form data to be submitted.
   * @returns A Promise that resolves when the section is successfully created.
   */
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    // Sets the loading state to true.
    setIsLoading(true)

    try {
      // Sends a POST request to create a new section.
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/section`,
        {
          method: "POST",
          headers: headersObj,
          body: JSON.stringify(values),
        }
      )

      console.log(response)

      // If the response is successful, displays a success toast and refreshes the page.
      if (response.ok) {
        toast({
          title: "Section berhasil dibuat",
          description: "Section anda berhasil dibuat.",
          duration: 5000,
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        // If the response is not successful, throws an error.
        throw new Error("Section gagal dibuat")
      }
    } catch (error) {
      // If there is an error, displays an error toast.
      toast({
        title: "Section gagal dibuat",
        description: "Section anda gagal dibuat.",
        duration: 5000,
        variant: "destructive",
      })
    } finally {
      // Sets the loading state to false.
      setIsLoading(false)
    }
  }

  return (
    <div className="ml-auto flex w-full justify-end py-4 pr-4">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <CreateButton name="Section" />
        </SheetTrigger>
        <SheetContent position="right" size="content">
          <SheetHeader>
            <SheetTitle>Tambah Section</SheetTitle>
            <SheetDescription>
              Tambah section baru untuk pengetahuan ini.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8 py-8"
            >
              <FormField
                control={form.control}
                name="section_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Section</FormLabel>
                    <FormControl>
                      <Input placeholder="Pendahuluan" {...field} />
                    </FormControl>
                    <FormDescription>Judul section anda.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="self-end">
                {isLoading ? (
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                ) : (
                  "Tambah"
                )}
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
