import { Suspense } from "react"
import { Metadata } from "next"
import Link from "next/link"

import BlurFade from "@/components/blur-fade"
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
    <BlurFade delay={0.25 * 2} inView>
      <Shell className="max-w-lg">
        <div className="flex items-center justify-center rounded-md bg-white">
          <Card className="w-full border-4 border-blue-950 bg-blue-50 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[5px_5px_0px_0px_rgba(15,23,42,1)] md:min-w-[30rem]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-black text-blue-950">
                👋 B - LIVE | Log in
              </CardTitle>
              <CardDescription className="font-medium text-blue-800">
                Masukkan kredential Anda untuk melanjutkan
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Suspense
                fallback={
                  <div className="flex h-32 items-center justify-center font-bold text-blue-800">
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
                className="text-sm font-semibold text-blue-700 underline-offset-4 transition-colors hover:text-blue-950 hover:underline"
              >
                Reset password
              </Link>
            </CardFooter>
          </Card>
        </div>
      </Shell>
    </BlurFade>
  )
}
