import { Suspense } from "react"
import { Command } from "lucide-react"

interface LoginLayoutPageProps {
  children: React.ReactNode
}

export default function LoginLayoutPage({ children }: LoginLayoutPageProps) {
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
          <Command className="mr-2 h-6 w-6" /> E Learning BPD - Otorisasi
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
        {children}
      </div>
    </div>
  )
}
