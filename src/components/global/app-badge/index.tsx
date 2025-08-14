"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import React from "react"

type Props = {
  children: React.ReactNode
}

const AppBadge = ({ children }: Props) => {
  return (
    <motion.div
      initial={{ "--x": "100%" } as any}
      animate={{ "--x": "-100%" } as any}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 4,
        ease: "linear",
      }}
      className={cn(
        "relative inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-white border border-white/10 shadow shadow-purple-500/40",
        "bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 bg-[length:200%_200%] overflow-hidden animate-gradient-glow"
      )}
      style={
        {
          "--x": "100%",
        } as React.CSSProperties
      }
    >
      {/* Animated Shimmer Overlay */}
      <span
        className="absolute inset-0 z-0 rounded-full"
        style={{
          WebkitMaskImage:
            "linear-gradient(-75deg, white calc(var(--x) + 20%), transparent calc(var(--x) + 30%), white calc(var(--x) + 100%))",
          maskImage:
            "linear-gradient(-75deg, white calc(var(--x) + 20%), transparent calc(var(--x) + 30%), white calc(var(--x) + 100%))",
          backgroundImage:
            "linear-gradient(-75deg, rgba(255,255,255,0.05) calc(var(--x) + 20%), rgba(255,255,255,0.25) calc(var(--x) + 25%), rgba(255,255,255,0.05) calc(var(--x) + 100%))",
        }}
      />

      {children}
    </motion.div>
  )
}

export default AppBadge
