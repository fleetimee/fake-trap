import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ProfileForm } from "@/components/forms/profile-form"

export const metadata: Metadata = {
  title: "Pengaturan",
  description: "Pengaturan",
}

export default async function OperatorLMSSettingPage() {
  return <ProfileForm />
}
