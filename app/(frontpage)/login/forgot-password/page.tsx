import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"

import { ForgotPasswordForm } from "@/components/forms/forgot-password-form"
import { Shell } from "@/components/shell/lobby-shell"
import { BackgroundGradient } from "@/components/ui/background-gradient"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Lupa Password",
  description: "Atur Ulang Password",
}

export default async function LoginPage() {
  return (
    <Shell className="max-w-lg">
      <BackgroundGradient className="rounded-[22px] bg-white p-1 dark:bg-zinc-900 sm:p-1 md:min-w-40">
        <Card className="md:min-w-[30rem]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">🤔 Atur Ulang Password</CardTitle>
            <CardDescription>
              Masukkan alamat email Anda dan kami akan mengirimkan kode
              verifikasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <ForgotPasswordForm />
            </Suspense>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-end gap-2">
            <div className="flex-1 text-sm text-muted-foreground">
              <span id="cooldown-text"></span>
            </div>
            <Link
              aria-label="Reset password"
              href="/login"
              className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
            >
              Kembali
            </Link>
          </CardFooter>
        </Card>
      </BackgroundGradient>
    </Shell>
  )
}
