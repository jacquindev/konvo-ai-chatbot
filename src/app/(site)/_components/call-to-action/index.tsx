"use client"

import { AnimatedGradientText } from "@/components/registry/animated-gradient-text"
import { AuroraText } from "@/components/registry/aurora-text"
import { Vortex } from "@/components/registry/vortex"
import { useMounted } from "@/hooks/shared"
import { useThemeMode } from "@/hooks/ui"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

const motionConfig = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 0.5, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay: 0.3, duration: 0.8 },
}

const spanLight = cva(
  "bg-gradient-to-r from-[#8b6ee9]/50 via-[#4f9fe6]/50 to-[#8b6ee9]/50 bg-[length:300%_100%]"
)
const spanDark = cva(
  "bg-gradient-to-r from-[#a48fff]/50 via-[#64b5f6]/50 to-[#a48fff]/50 bg-[length:300%_100%]"
)

const CallToAction = () => {
  const isMounted = useMounted()
  const router = useRouter()

  const { theme } = useThemeMode()

  const fromColor = theme === "dark" ? "#a48fff" : "#8b6ee9"
  const toColor = theme === "dark" ? "#64b5f6" : "#4f9fe6"
  const auroraColors = ["#5e4db1", "#a48fff", "#8b6ee9", "#64b5f6", "#4f9fe6", "#8fd0ff"]

  if (!isMounted) return <></>

  return (
    <motion.div {...motionConfig} className="w-screen mx-auto h-screen overflow-hidden">
      <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,#453682_100%)]" />
      <Vortex
        backgroundColor="transparent"
        baseHue={220}
        particleCount={800}
        rangeHue={40}
        rangeY={120}
        className="flex items-center flex-col justify-center h-full w-full"
      >
        <div className="group relative mx-auto flex items-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] p-[1.5px] transition-transform duration-300 ease-in-out group-hover:translate-x-0.5",
              theme === "dark" ? spanDark() : spanLight()
            )}
            style={{
              WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />

          <AnimatedGradientText
            className="text-lg font-medium tracking-tight transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
            colorFrom={fromColor}
            colorTo={toColor}
          >
            An AI powered sales assistant chatbot
          </AnimatedGradientText>
        </div>

        <AuroraText
          colors={auroraColors}
          className="text-shadow-xl max-w-full text-9xl lg:text-[200px] xl:text-[250px] font-bold text-shadow-xl transform mt-6"
        >
          Konvo.
        </AuroraText>

        <motion.p
          {...motionConfig}
          className="mx-auto max-w-md md:max-w-2xl text-center text-lg font-normal lg:text-xl dark:text-muted-foreground leading-tight"
        >
          Turn visitors into customers — Konvo brings real-time AI sales assistance to your site in
          seconds.
        </motion.p>

        <motion.button
          {...motionConfig}
          onClick={() => router.push("/user")}
          className="mt-12 relative inline-flex h-16 overflow-hidden rounded-lg p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] dark:animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#eae5ff_0%,#84adee_50%,#eae5ff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#7094f3_0%,#9886ff_50%,#7094f3_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-primary/25 dark:bg-background px-3 py-1 text-xl font-semibold dark:text-white backdrop-blur-3xl relative group transition duration-200 hover:bg-transparent dark:hover:bg-transparent">
            ✨ Start For FREE ✨
          </span>
        </motion.button>
      </Vortex>
    </motion.div>
  )
}

export default CallToAction
