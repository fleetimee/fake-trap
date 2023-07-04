"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { set } from "date-fns"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const formSchema = z.object({
  section: z.array(
    z.object({
      section_title: z.string().min(2).max(18).nonempty(),
    })
  ),
})

export function CreateCourseSectionButton(props: { id_course: number }) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      section: [{ section_title: "" }],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${props.id_course}/section`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Section berhasil ditambahkan",
        })

        router.refresh()
        form.reset()
        setOpen(false)
      } else {
        toast({
          title: "Gagal",
          description: "Section gagal ditambahkan",
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: "Gagal",
        description: "Section gagal ditambahkan",
      })
    } finally {
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
              Tambah section baru untuk kursus ini.
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8 py-8"
            >
              <FormField
                control={form.control}
                name={"section.0.section_title"}
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
