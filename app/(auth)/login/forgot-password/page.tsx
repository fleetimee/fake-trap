import { Suspense } from "react"
import Link from "next/link"

import { ForgotPasswordForm } from "@/components/forms/forgot-password-form"





export const metadata = {
  title: "Lupa Password",
  description: "Masuk ke akun e-learning",
}

export default async function LoginPage() {
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Lupa Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Masukkan email anda untuk mengatur ulang password, password baru akan
          dikirim ke email anda.
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
      <Link href="/login">
        <p className="text-end text-sm text-muted-foreground hover:text-blue-500 hover:underline">
          Kembali
        </p>
      </Link>
    </div>
  )
}
