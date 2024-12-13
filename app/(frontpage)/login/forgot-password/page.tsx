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
      <div className="flex items-center justify-center rounded-md bg-white">
        <Card className="w-full border-4 border-blue-950 bg-blue-50 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] md:min-w-[30rem]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-black text-blue-950">
              🤔 Atur Ulang Password
            </CardTitle>
            <CardDescription className="font-medium text-blue-800">
              Masukkan alamat email Anda dan kami akan mengirimkan kode
              verifikasi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="flex h-32 items-center justify-center font-bold text-blue-800">
                  Loading...
                </div>
              }
            >
              <ForgotPasswordForm />
            </Suspense>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-end gap-2">
            <div className="flex-1 text-sm font-medium text-blue-800">
              <span id="cooldown-text"></span>
            </div>
            <Link
              aria-label="Reset password"
              href="/login"
              className="text-sm font-semibold text-blue-700 underline-offset-4 transition-colors hover:text-blue-950 hover:underline"
            >
              Kembali
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Shell>
  )
}
