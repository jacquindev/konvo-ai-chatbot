"use client"

import { ChatBotPanel } from "@/components/global/chatbot"
import { SHOWCASES } from "@/constants/landing"
import { motion, Variants } from "motion/react"

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const ShowCase = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative isolate rounded-3xl lg:px-16 w-full md:w-10/12 mx-auto overflow-hidden shadow-2xl bg-transparent backdrop-blur-2xl border-none"
    >
      {/* Gradient Background */}
      <div
        className="absolute inset-0 -z-10 bg-[length:300%_300%] animate-[gradient-glow_10s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--primary) 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 items-center relative z-10"
      >
        {/* Left Side: Text + Features */}
        <motion.div
          variants={itemVariants}
          className="bg-background/80 dark:bg-background/50 hover:scale-105 duration-300 transform transition-all backdrop-blur-sm rounded-3xl p-10 shadow-lg space-y-6"
        >
          <h2 className="text-3xl font-semibold text-black dark:text-white sm:text-4xl leading-tight">
            Experience Conversational Support That Converts
          </h2>
          <p className="text-base text-[#444] dark:text-zinc-300 max-w-prose">
            Meet your AI assistant. Automate onboarding, assist customers in real-time, and grow
            your business — all through a customizable chat experience.
          </p>

          <motion.ul className="space-y-5">
            {SHOWCASES.map((feature, index) => (
              <motion.li key={index} variants={itemVariants} className="flex items-start gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                <div>
                  <h3 className="text-base font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right Side: Chat Demo */}
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-md">
            <ChatBotPanel isLanding />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ShowCase
