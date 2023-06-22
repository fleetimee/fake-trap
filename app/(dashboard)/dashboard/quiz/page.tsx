import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Quiz",
  description: "Quiz yang tersedia di e-learning",
}

export default function QuizPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Quiz"
        description="Quiz yang tersedia di e-learning"
      />
    </DashboardShell>
  )
}
