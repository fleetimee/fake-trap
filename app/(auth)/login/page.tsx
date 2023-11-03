import { Suspense } from "react"
import { Command } from "lucide-react"

import { UserAuthForm } from "@/components/user-auth-form"

export const metadata = {
  title: "Login",
  description: "Masuk ke akun e-learning",
}

export default async function LoginPage() {
  return (
    <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:h-full lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: "url(/images/bg-login.jpg)",
          }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Command className="mr-2 h-6 w-6" /> E Learning BPD - Login
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Elearning BPD DIY adalah platform yang inovatif dan
              berkualitas tinggi dalam memberikan pendidikan online yang
              memungkinkan akses yang mudah, interaktif, dan berkelanjutan bagi
              semua peserta didik!&rdquo;
            </p>
            <footer className="text-sm">Admin</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full flex-col items-center justify-center lg:p-8">
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
        </div>
      </div>
    </div>
  )
}
