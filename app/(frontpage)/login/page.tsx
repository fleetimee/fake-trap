import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"

import { UserAuthForm } from "@/components/forms/user-auth-form"
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
  title: "Login",
  description: "Masuk ke BLIVE",
}

export default async function LoginPage() {
  return (
    <Shell className="max-w-lg">
      <div className="flex items-center justify-center rounded-md bg-white"></div>
      <BackgroundGradient className="rounded-[22px] bg-white p-1 dark:bg-zinc-900  md:min-w-[30rem]">
        <Card className=" md:min-w-[30rem]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">👋 B - LIVE | Log in</CardTitle>
            <CardDescription>
              Masukkan kredential Anda untuk melanjutkan
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
      </BackgroundGradient>
    </Shell>
  )
}
