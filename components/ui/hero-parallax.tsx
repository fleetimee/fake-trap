"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string
    thumbnail: string
  }[]
}) => {
  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  )
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  )
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  )
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  )
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  )
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  )
  return (
    <div
      ref={ref}
      className="relative flex h-[300vh]  flex-col self-auto overflow-hidden py-40 antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="mb-20 flex  flex-row space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export const Header = () => {
  return (
    <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4  py-20 md:py-40">
      <h1 className="text-2xl font-bold dark:text-white md:text-7xl">
        BPD DIY <br /> E-Learning
      </h1>
      <p className="mt-8 max-w-2xl text-base dark:text-neutral-200 md:text-xl">
        Kami membuka pintu pengetahuan dengan belajar online yang mudah dan
        interaktif. Dengan berbagai kursus yang dirancang oleh para ahli di
        bidangnya, BPD DIY E-Learning membantu Anda mengasah keterampilan dan
        memperluas wawasan Anda.
      </p>
    </div>
  )
}

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string
    thumbnail: string
  }
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative h-96 w-[30rem] flex-shrink-0"
    >
      <Image
        src={product.thumbnail}
        height="600"
        width="600"
        className="absolute inset-0 h-full w-full object-cover object-left-top"
        alt={product.title}
      />

      <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 group-hover/product:opacity-80"></div>
      <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  )
}
