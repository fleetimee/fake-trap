import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Pengaturan" description="Pengaturan akun" />
    </DashboardShell>
  )
}
