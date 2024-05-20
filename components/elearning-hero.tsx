"use client"

import { motion } from "framer-motion"

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight"

export function ElearningHero() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="mx-auto max-w-4xl  text-left text-2xl font-bold leading-relaxed  text-white md:text-4xl lg:text-5xl lg:leading-snug "
      >
        <div className="text-left text-6xl text-white">B-LIVE</div>
        <div className="text-2xl">
          {" "}
          (BPD DIY Learning Integrated Virtual Education)
        </div>
        <div className="hidden font-normal text-white md:block">
          Dengan BPD DIY LMS kamu bisa belajar dimana saja dan kapan saja.
        </div>
      </motion.h1>
    </HeroHighlight>
  )
}
