import { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { storeSubscriptionPlans } from "@/config/approval-type"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { MotionDiv } from "@/components/framer-wrapper"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { BreadCrumbs } from "@/components/pagers/breadcrumb"
import { DashboardShell } from "@/components/shell"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"





export const metadata: Metadata = {
  title: "Approval",
  description:
    "Halaman approval untuk supervisor yang digunakan untuk menyetujui atau menolak pengetahuan dan pelatihan yang dibuat oleh member",
}

export default async function SupervisorApprovalPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  return (
    <DashboardShell>
      <BreadCrumbs
        segments={[
          {
            href: "/supervisor-area",
            title: "Supervisor Area",
          },
          {
            href: "/supervisor-area/approval",
            title: "Approval",
          },
        ]}
      />
      <MotionDiv
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardHeader
          heading="Aprroval"
          description="
            Pilih tipe approval yang ingin anda lakukan
                  "
        />
      </MotionDiv>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-2">
        {storeSubscriptionPlans.map((plan, i) => (
          <Card
            key={plan.name}
            className={cn(
              "flex flex-col",
              i === storeSubscriptionPlans.length - 1 &&
                "lg:col-span-2 xl:col-span-1",
              "hover:border-primary",
              "min-h-[25rem]"
            )}
          >
            <CardHeader>
              <CardTitle className="line-clamp-1">{plan.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid flex-1 place-items-start gap-6">
              <div className="space-y-2 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Icons.check className="h-4 w-4" aria-hidden="true" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-4">
              <Link
                href={plan.link}
                className={cn(
                  buttonVariants({
                    className: "w-full",
                  })
                )}
              >
                Get started
                <span className="sr-only">Get started</span>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}
