"use client"

import Image from "next/image"
import React from "react"
import { motion, useScroll, useTransform, useSpring, MotionValue } from "motion/react"
import { AuroraText } from "./aurora-text"

type Product = {
  title: string
  link: string
  thumbnail: string
}

export const HeroParallax = ({ products }: { products: Product[] }) => {
  const ref = React.useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig)
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  )
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig)
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig)
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig)

  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      <ParallaxHeader />

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }} className="space-y-20">
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 px-4">
          {firstRow.map(product => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>

        <motion.div className="flex flex-row space-x-10 px-4">
          {secondRow.map(product => (
            <ProductCard key={product.title} product={product} translate={translateXReverse} />
          ))}
        </motion.div>

        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 px-4">
          {thirdRow.map(product => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

const ParallaxHeader = () => {
  return (
    <div className="max-w-7xl relative mx-auto px-4 py-20 md:py-40 text-center">
      <AuroraText
        colors={["#5e00ff", "#7f22fe", "#a259ff", "#b072ff", "#e12bfb"]}
        speed={1.25}
        className="text-4xl md:text-7xl font-bold tracking-tight text-shadow-xl"
      >
        Build with AI superpowers
      </AuroraText>
      <p className="mt-6 max-w-lg md:max-w-2xl mx-auto text-base lg:text-xl text-muted-foreground">
        Empower your website with an intelligent AI assistant — built for developers, loved by
        users. Konvo helps you automate support, personalize conversations, and scale with ease.
      </p>
    </div>
  )
}

const ProductCard = ({
  product,
  translate,
}: {
  product: Product
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group relative w-[18rem] md:w-[24rem] h-80 md:h-96 shrink-0 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-2xl transition-shadow duration-300"
    >
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={600}
          height={600}
          loading="lazy"
          className="object-cover object-left-top absolute h-full w-full inset-0"
        />
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h2 className="text-lg font-semibold">{product.title}</h2>
        </div>
      </a>
    </motion.div>
  )
}
