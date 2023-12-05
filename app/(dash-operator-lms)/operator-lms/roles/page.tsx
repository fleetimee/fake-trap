import { JSX, SVGProps } from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"

import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = {
  title: "Managemen Kewenangan",
  description: "Managemen Kewenangan",
}

export default async function OperatorLMSRolePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return <Component />
}

export function Component() {
  return (
    <Card key="1" className="w-full max-w-lg">
      <CardHeader className="border-dark-gray-300 border-b pb-4">
        <div className="flex items-center">
          <IconCookie className="mr-2" />
          <CardTitle>Managemen Kewenangan</CardTitle>
        </div>
        <CardDescription>
          Klik pada salah satu kewenangan untuk melihat detailnya.
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

function IconCookie(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      <path d="M8.5 8.5v.01" />
      <path d="M16 15.5v.01" />
      <path d="M12 12v.01" />
      <path d="M11 17v.01" />
      <path d="M7 14v.01" />
    </svg>
  )
}
