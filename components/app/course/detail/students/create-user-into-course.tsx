"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { UserResponse } from "@/types/user-res"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

/**
 * Defines a schema for the form data that includes an array of users, each with a UUID string.
 */
const formSchema = z.object({
  users: z
    .array(
      z.object({
        uuid: z.string().nonempty(),
      })
    )
    .nonempty({ message: "Pilih setidaknya satu murid." }),
})

export function CreateStudentsIntoCourseButton(props: {
  user: UserResponse
  id_course: number
}) {
  const { data: session } = useSession()

  const router = useRouter()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      users: [],
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/secure/course/${props.id_course}/users`,
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
          title: "Success",
          description: "User berhasil ditambahkan untuk kursus ini.",
        })

        router.refresh()
        setOpen(false)
        form.reset()
      } else {
        toast({
          title: "Error",
          description:
            "Terjadi kesalahan saat menambahkan user untuk kursus ini.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button>Tambah Murid</Button>
      </SheetTrigger>
      <SheetContent size="content" position="right">
        <SheetHeader>
          <SheetTitle>Tambah Murid</SheetTitle>
          <SheetDescription>
            Pilih murid yang ingin ditambahkan ke kursus ini.{" "}
            <span className="text-red-500">*</span>
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 py-8"
          >
            <FormField
              control={form.control}
              name="users"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Murid yang ingin ditambahkan</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? props.user.data.find(
                                  (users) =>
                                    users.uuid ===
                                    (field.value && field.value[0]?.uuid)
                                )?.username
                              : "Pilih User"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Command>
                          <CommandInput placeholder="Jenis Kategori" />
                          <CommandEmpty>User tidak ditemukan</CommandEmpty>
                          <CommandGroup>
                            {props.user.data.map((user) => (
                              <CommandItem
                                value={user.uuid}
                                key={user.uuid}
                                onSelect={(value) => {
                                  form.setValue("users", [
                                    {
                                      uuid: value,
                                    },
                                  ])
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    user.uuid ===
                                      (field.value && field.value[0]?.uuid)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {user.username}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    User yang ingin ditambahkan ke kursus ini.
                  </FormDescription>
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
  )
}
