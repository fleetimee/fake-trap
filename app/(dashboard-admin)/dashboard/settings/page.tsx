import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"





const metadata = {
  title: "Pengaturan",
  description: "Pengaturan akun",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pengaturan" description="Pengaturan akun" />
    </DashboardShell>
  )
}
