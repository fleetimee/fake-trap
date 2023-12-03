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
              <Card
                key={feature.title}
                className={cn("p-2")}
                style={{
                  backgroundImage: `url(https://img-c.udemycdn.com/course/750x422/4834448_66ec.jpg)`,
                  backgroundSize: "cover",
                }}
              >
                <CardHeader className="text-primary">{feature.icon}</CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle className="font-heading text-primary">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
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
