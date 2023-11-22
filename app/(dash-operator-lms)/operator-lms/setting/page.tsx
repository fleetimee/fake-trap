import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Pengaturan",
  description: "Pengaturan",
}

export default async function OperatorLMSSettingPage() {
  return <p>Novian</p>
}
