"use client"

import { Variants } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

import { UserAreaFeature } from "@/config/dashboard"
import { cn } from "@/lib/utils"

import { MotionDiv } from "./framer-wrapper"
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"


const parentVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.5 } },
}

const childrenVariant: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
}

interface DashboardInformationProps {
  roleName: string
  roleDescription: string
  features: UserAreaFeature[]
}

export function DashboardInformation({
  roleName,
  roleDescription,
  features,
}: DashboardInformationProps) {
  return (
    <MotionDiv initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">
            Anda login sebagai :{" "}
            <span className="font-light underline">{roleName}</span>
          </CardTitle>

          <CardDescription>{roleDescription}</CardDescription>
        </CardHeader>

        <MotionDiv variants={parentVariant} initial="initial" animate="animate">
          <ul className="flex flex-col gap-4 px-6 pb-6">
            {features.map((feature) => (
              <MotionDiv variants={childrenVariant} className="child">
                <div className="flex flex-col gap-1" key={feature.title}>
                  <li key={feature.title} className="flex items-center">
                    <CheckCircle2 className="mr-4 h-6 w-6 fill-primary text-primary-foreground" />
                    {feature.title}
                  </li>
                  <li key={feature.title} className="flex items-center">
                    <CheckCircle2 className="relative mr-4 hidden h-6 w-6 fill-primary text-primary-foreground" />
                    <p className={cn("text-xs", "px-10 font-light")}>
                      {feature.description}
                    </p>
                  </li>
                </div>
              </MotionDiv>
            ))}
          </ul>
        </MotionDiv>
      </Card>
    </MotionDiv>
  )
}
