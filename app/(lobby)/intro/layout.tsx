import { getCurrentUser } from "@/lib/session"
import { SiteFooter } from "@/components/layouts/site-footer"
import { SiteHeader } from "@/components/layouts/site-header"

interface IntroLayoutProps {
  children: React.ReactNode
}

export default async function IntroLayout({ children }: IntroLayoutProps) {
  const user = await getCurrentUser()

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">{children}</main>
      <SiteFooter className="border-t" />
    </div>
  )
}
