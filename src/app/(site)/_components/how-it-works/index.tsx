"use client"

import { Globe, Rocket, Settings } from "@/components/icons"
import { AnimatedGradientText } from "@/components/registry/animated-gradient-text"
import { landingDescriptionStyle, landingHeadingStyle } from "@/constants/landing"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { ArrowDown } from "lucide-react"
import { motion } from "motion/react"
import Image from "next/image"
import React from "react"
import StepCard from "./step-card"

const iconClassName = cva("w-8 h-8")

const HOW_IT_WORKS = [
  {
    title: "1. Connect your domain",
    description: "Easily link Konvo to your website or platform in seconds. No coding required.",
    icon: <Globe className={iconClassName()} />,
  },
  {
    title: "2. Customize your assistant",
    description: "Match your brand with custom colors, avatar, and welcome message.",
    icon: <Settings className={iconClassName()} />,
  },
  {
    title: "3. Deploy and scale",
    description: "Launch your AI assistant and manage conversations with powerful analytics.",
    icon: <Rocket className={iconClassName()} />,
  },
]

const HowItWorks = () => {
  return (
    <div className="rounded-3xl relative w-full px-4 sm:px-8 md:px-12 py-20 overflow-hidden shadow-[0_0_100px_rgba(127,76,200,0.25)] border-none">
      <Image
        src="/assets/abstract.jpg"
        alt="background"
        fill
        priority
        className="object-cover object-center pointer-events-none select-none z-[-2]"
      />

      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm z-[-1]" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.25 }}
          viewport={{ once: true }}
          className={cn(
            landingHeadingStyle(),
            "flex items-center justify-center flex-wrap gap-2 lg:gap-4 mb-4 drop-shadow-xl"
          )}
        >
          <span>How</span>
          <span>Does</span>
          <AnimatedGradientText colorFrom="#a48fff" colorTo="#64b5f6">
            Konvo
          </AnimatedGradientText>
          <span>Work?</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeOut", type: "spring" }}
          viewport={{ once: true }}
          className={cn(landingDescriptionStyle(), "max-w-lg mx-auto mb-16")}
        >
          Connect your content, embed the widget, and let Konvo handle smart, real-time support
          across your platform.
        </motion.p>
      </div>

      {/* Zigzag Steps */}
      <div className="flex flex-col gap-8 max-w-6xl mx-auto px-2">
        {HOW_IT_WORKS.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <StepCard
                index={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            </motion.div>

            {/* Floating Arrow */}
            {index < HOW_IT_WORKS.length - 1 && <AnimatedArrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const AnimatedArrow = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="text-primary m-auto"
    >
      <ArrowDown className="w-8 h-8 animate-pulse text-white drop-shadow-[0_0_10px_#64b5f6]" />
    </motion.div>
  )
}

export default HowItWorks
