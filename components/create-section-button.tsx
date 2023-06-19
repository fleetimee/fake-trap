"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CreateButton } from "@/components/create-button"

/**
 * Defines a schema for the form data used to create a new section in the knowledge sidebar.
 */
const formSchema = z.object({
  section_title: z.string().min(2).max(18).nonempty(),
})

export function CreateSectionButton() {
  /**
   * Initializes a form using the `useForm` hook from `react-hook-form` library.
   * The form uses the `zodResolver` from `@hookform/resolvers/zod` to validate the form data.
   * @returns An object containing the form instance.
   */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      section_title: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className="ml-auto flex w-full justify-end py-4 pr-4">
      <Sheet>
        <SheetTrigger asChild>
          <CreateButton name="Section" />
        </SheetTrigger>
        <SheetContent position="right" size="sm">
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
                    <FormLabel>Judul section</FormLabel>
                    <FormControl>
                      <Input placeholder="Pendahuluan" {...field} />
                    </FormControl>
                    <FormDescription>Judul section anda.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="self-end">
                Submit
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
