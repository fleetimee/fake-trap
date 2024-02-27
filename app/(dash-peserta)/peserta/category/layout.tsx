import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { Separator } from "@/components/ui/separator"

interface PemateriCategoryLayoutProps {
  children: React.ReactNode
}

export default function PemateriCategoryLayout({
  children,
}: PemateriCategoryLayoutProps) {
  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/peserta",
            title: "Dashboard",
          },
          {
            href: "/peserta/category",
            title: "Modul",
          },
        ]}
      />

      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader
          heading="Modul"
          description="
          Semua Modul yang tersedia di BPD E-learning"
        />
      </MotionDiv>

      <Separator />

      <div className="space-y-8">{children}</div>
    </DashboardShell>
  )
}
