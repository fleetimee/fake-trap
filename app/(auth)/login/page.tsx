import { Suspense } from "react"
import Link from "next/link"

import { UserAuthForm } from "@/components/user-auth-form"

export const metadata = {
  title: "Login",
  description: "Masuk ke akun e-learning",
}

export default async function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Masuk ke E Learning BPD
        </h1>
        <p className="text-sm text-muted-foreground">
          Masukkan username dan password anda untuk mengakses E Learning BPD
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserAuthForm />
      </Suspense>
      <Link href="/login/forgot-password">
        {" "}
        {/* Step 2: Add a new Link element */}
        <p className="text-end text-sm text-muted-foreground hover:text-blue-500 hover:underline">
          Lupa password ?
        </p>{" "}
        {/* Step 3 and 4: Add the text and style the Link element */}
      </Link>
    </div>
  )
}
