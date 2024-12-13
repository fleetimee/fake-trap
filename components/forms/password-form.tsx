"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AlertCircle,
  CheckIcon,
  KeyRound,
  Lock,
  Shield,
  XIcon,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast as sonnerToast } from "sonner"
import * as z from "zod"

import { changePassword } from "@/lib/fetcher/password-fetcher"
import { changePasswordSchema } from "@/lib/validations/change-password"

import { Icons } from "../icons"
import { PasswordInput } from "../password-input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"

type Inputs = z.infer<typeof changePasswordSchema>

interface ErrorResponseProps {
  error: string
}

export function ChangePasswordForm() {
  const { data: session } = useSession()

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  })

  const checkPasswordStrength = (password: string) => {
    const length = password.length >= 8
    const uppercase = /[A-Z]/.test(password)
    const lowercase = /[a-z]/.test(password)
    const number = /[0-9]/.test(password)
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password) // At least one special character

    setPasswordStrength({ length, uppercase, lowercase, number, specialChar })
  }

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  })

  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [formData, setFormData] = useState<Inputs | null>(null)

  const handleSubmit = (data: Inputs) => {
    setFormData(data)
    setIsConfirmOpen(true)
  }

  const handleConfirm = async () => {
    if (!formData) return
    setIsConfirmOpen(false)

    startTransition(async () => {
      try {
        const response = await changePassword({
          token: session?.user.token,
          uuid: session?.expires.id,
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          sonnerToast.success("Berhasil", {
            description: "Password berhasil diubah",
          })

          router.refresh()
          form.reset()
        } else {
          const error: ErrorResponseProps = await response.json()

          sonnerToast.error("Gagal", {
            description: `${error.error}`,
          })
        }
      } catch (error) {
        sonnerToast.error("Gagal", {
          description: `${error}`,
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-2xl space-y-8 rounded-lg border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white/50 p-6 shadow-sm backdrop-blur-sm"
      >
        <FormField
          control={form.control}
          name="old_password"
          render={({ field }) => (
            <FormItem className="rounded-md border border-blue-50 bg-white/80 p-4">
              <FormLabel className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-blue-600" />
                <span>Password Lama</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  disabled={isPending}
                  placeholder="Masukkan password lama"
                  className="border-blue-100 focus-visible:ring-blue-400"
                />
              </FormControl>
              <FormDescription className="text-blue-600/80">
                Masukkan password lama anda untuk memvalidasi perubahan
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="rounded-md border border-blue-50 bg-white/80 p-4">
              <FormLabel className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-600" />
                <span>Password Baru</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  disabled={isPending}
                  onChange={(e) => {
                    field.onChange(e)
                    checkPasswordStrength(e.target.value)
                  }}
                  placeholder="Masukkan password baru"
                  className="border-blue-100 focus-visible:ring-blue-400"
                />
              </FormControl>
              <FormDescription className="text-blue-600/80">
                Password baru harus memenuhi kriteria berikut
              </FormDescription>
              <div className="mt-2 space-y-2 rounded-md bg-blue-50/50 p-3 text-sm">
                <div className="flex items-center gap-2">
                  {passwordStrength.length ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <XIcon className="h-4 w-4 text-red-500" />
                  )}
                  <p>Minimal 8 karakter</p>
                </div>
                <div className="flex items-center gap-2">
                  {passwordStrength.uppercase ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <XIcon className="h-4 w-4 text-red-500" />
                  )}
                  <p>Minimal 1 huruf kapital</p>
                </div>
                <div className="flex items-center gap-2">
                  {passwordStrength.lowercase ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <XIcon className="h-4 w-4 text-red-500" />
                  )}
                  <p>Minimal 1 huruf kecil</p>
                </div>
                <div className="flex items-center gap-2">
                  {passwordStrength.number ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <XIcon className="h-4 w-4 text-red-500" />
                  )}
                  <p>Minimal 1 angka</p>
                </div>
                <div className="flex items-center gap-2">
                  {passwordStrength.specialChar ? (
                    <CheckIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <XIcon className="h-4 w-4 text-red-500" />
                  )}
                  <p>Minimal 1 karakter khusus</p>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password_confirmation"
          rules={{
            validate: (value) =>
              value === form.getValues("password") ||
              "Konfirmasi password tidak cocok",
          }}
          render={({ field }) => (
            <FormItem className="rounded-md border border-blue-50 bg-white/80 p-4">
              <FormLabel className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <span>Konfirmasi Password Baru</span>
              </FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  disabled={isPending}
                  placeholder="Konfirmasi password baru"
                  className="border-blue-100 focus-visible:ring-blue-400"
                />
              </FormControl>
              <FormDescription className="text-blue-600/80">
                Pastikan password yang dimasukkan sama
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={
            isPending ||
            !(
              passwordStrength.length &&
              passwordStrength.uppercase &&
              passwordStrength.lowercase &&
              passwordStrength.number &&
              passwordStrength.specialChar &&
              !form.formState.errors.password_confirmation
            )
          }
          className="flex w-fit items-center gap-2 bg-blue-600 text-white transition-colors hover:bg-blue-700"
        >
          {isPending && (
            <Icons.spinner
              className="h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          <Shield className="h-4 w-4" />
          Perbarui Password
        </Button>

        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
          <AlertDialogContent className="font-sans">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-blue-900">
                Konfirmasi Perubahan Password
              </AlertDialogTitle>
              <AlertDialogDescription className="text-blue-600/80">
                Apakah Anda yakin ingin mengubah password? Setelah password
                diubah, Anda akan perlu menggunakan password baru untuk login.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-blue-100">
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirm}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isPending ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>Ya, Ubah Password</span>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </form>
    </Form>
  )
}
