"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import React from "react"

type StepCardProps = {
  index: number
  title: string
  description: string
  icon: React.ReactNode
  align?: "left" | "right"
}

const StepCard = ({ index, title, description, icon, align = "left" }: StepCardProps) => {
  const isLeft = align === "left"

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col md:flex-row items-center gap-10 px-8 py-10 rounded-2xl bg-card/70 border border-card shadow-lg backdrop-blur-xl hover:scale-[1.02] transition-transform duration-300 group",
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600/30 to-indigo-400/20 shadow-[0_0_12px_rgba(99,102,241,0.7)] "
      >
        {icon}
      </motion.div>
      <div className="max-w-md text-center md:text-left space-y-3">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export default StepCard
