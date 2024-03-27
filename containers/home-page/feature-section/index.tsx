"use client"

import { Variants } from "framer-motion"
import Balancer from "react-wrap-balancer"

import { MarketingCard } from "@/components/cards/marketing-card"

interface FeatureSectionProps {}

const parentVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const childVariant: Variants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
}

/**
 * Renders the feature section of the home page.
 *
 * @param {FeatureSectionProps} props - The component props.
 * @returns {JSX.Element} The rendered feature section.
 */
export function FeatureSection({}: FeatureSectionProps) {
  return (
    <section
      className="relative flex h-auto min-h-screen flex-col  lg:min-h-[100svh]"
      id="feature"
    >
      <div className="gap-12  ">
        <section className="space-y-6  py-12 md:pt-10 lg:pt-24">
          <div className="mx-auto flex max-w-[58rem] animate-fade-up flex-col items-center py-2 text-center">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
              Fitur
            </h2>

            <p
              className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
              style={{
                animationDelay: "0.30s",
                animationFillMode: "forwards",
              }}
            >
              <Balancer>
                Fitur yang tersedia di dalam e-learning ini dapat membantu Anda
                untuk mengembangkan pengetahuan dan keterampilan Anda dengan
                mudah.
              </Balancer>
            </p>
          </div>

          <MarketingCard
            parentVariant={parentVariant}
            childVariant={childVariant}
          />
        </section>
      </div>
    </section>
  )
}
