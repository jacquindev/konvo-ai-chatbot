"use client"

import AppLogo from "@/components/global/app-logo"
import { TypingAnimation } from "@/components/registry/typing-animation"
import { useThemeMode } from "@/hooks/ui"
import { motion } from "motion/react"
import Image from "next/image"
import React from "react"

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  const { theme } = useThemeMode()

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      <div className="relative flex w-full flex-col justify-center px-6 py-12 sm:px-10 lg:w-2/5">
        <div className="absolute top-6 left-6 sm:left-10">
          <AppLogo />
        </div>

        <div className="mx-auto flex w-full items-center justify-center py-20">{children}</div>
      </div>

      <div className="gradient-background relative hidden w-3/5 flex-col justify-between overflow-hidden p-12 text-white after:absolute after:inset-0 after:bg-gradient-to-t after:from-gray-500/50 after:to-transparent lg:flex">
        <motion.div
          className="z-10 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TypingAnimation
            className="bg-gradient-to-b from-white to-indigo-200 bg-clip-text text-3xl leading-tight font-bold tracking-tight text-transparent"
            duration={40}
          >
            Hi, I&apos;m your AI-powered sales assistant, Konvo!
          </TypingAnimation>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="leading-tight text-white/80 italic"
          >
            Start converting visitors into loyal customers with just a snippet of code...
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="pointer-events-none bottom-0 z-50 top-70 h-[80vh] w-full rounded-xl relative"
        >
          <Image
            src={theme === "dark" ? "/assets/app-ui.png" : "/assets/app-ui-light.png"}
            alt="ui"
            loading="lazy"
            width={1000}
            height={1000}
            className="opacity-100 absolute bottom-0 !w-[1600px] shrink-0 rounded-xl"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default AuthLayout
