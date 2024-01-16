import { Suspense } from "react"
import Link from "next/link"

import { ForgotPasswordForm } from "@/components/forms/forgot-password-form"
import { Shell } from "@/components/shell/lobby-shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata = {
  title: "Lupa Password",
  description: "Masuk ke akun e-learning",
}

export default async function LoginPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordForm />
          </Suspense>{" "}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-end gap-2">
          <Link
            aria-label="Reset password"
            href="/login"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Kembali
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  )
}
