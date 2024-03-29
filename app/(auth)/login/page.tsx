import { Suspense } from "react"
import Link from "next/link"

import { Shell } from "@/components/shell/lobby-shell"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata = {
  title: "Login",
  description: "Masuk ke akun e-learning",
}

export default async function LoginPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Suspense
            fallback={
              <div className="flex h-32 items-center justify-center">
                Loading...
              </div>
            }
          >
            <UserAuthForm />
          </Suspense>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-end gap-2">
          <Link
            aria-label="Reset password"
            href="/login/forgot-password"
            className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </Shell>
  )
}
