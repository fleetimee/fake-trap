"use client"

import Link from "next/link"
import { Variants } from "framer-motion"

import { marketingFeatures } from "@/config/marketing-feature"
import { cn } from "@/lib/utils"

import { MotionDiv } from "./framer-wrapper"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

interface MarketingCardProps {
  parentVariant: Variants
  childVariant: Variants
}

export function MarketingCard({
  parentVariant,
  childVariant,
}: MarketingCardProps) {
  return (
    <div className="container mx-auto my-16 w-full max-w-screen-lg animate-fade-up place-items-center items-center justify-center gap-5  p-5 xl:px-0">
      <MotionDiv
        className="grid grid-cols-1 gap-5  md:grid-cols-2 "
        initial="initial"
        animate="animate"
        variants={parentVariant}
      >
        {marketingFeatures.map((feature) => (
          <MotionDiv
            className="child transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            variants={childVariant}
            key={feature.title}
          >
            <Link
              href={feature.link}
              className={cn("flex h-full flex-col items-center justify-center")}
            >
              <Card key={feature.title} className="relative overflow-hidden">
                <div
                  className="absolute inset-0  bg-[length:300px_200px] bg-clip-content bg-right-bottom bg-no-repeat bg-blend-darken"
                  style={{
                    transform: "scale(1.1)",
                    backgroundImage: `linear-gradient(to right, white, transparent), url(${feature.image})`,
                  }}
                ></div>
                <CardHeader className="text-primary">{feature.icon}</CardHeader>
                <CardContent
                  className="relative space-y-2"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
                >
                  <CardTitle
                    className="font-sans text-primary"
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                  >
                    {feature.title}
                  </CardTitle>
                  <CardDescription
                    className="mt-2 max-w-md "
                    style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                  >
                    {feature.body}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          </MotionDiv>
        ))}
      </MotionDiv>
    </div>
  )
}
