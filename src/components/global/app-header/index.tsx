"use client"

import { motion } from "motion/react"

type Props = {
  title: string
  description: string
}

const AppHeader = ({ title, description }: Props) => {
  return (
    <motion.div
      className="relative w-full max-w-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="absolute inset-0 h-full w-full scale-[0.8] transform rounded-full bg-gradient-to-br dark:from-blue-900 from-blue-300 dark:bg-pink-900 bg-pink-300 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border-none bg-transparent px-4 py-8"
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          className="capitalize text-5xl font-bold bg-gradient-to-br from-indigo-500 to-purple-500 dark:to-purple-400 bg-clip-text text-transparent"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="text-muted-foreground pt-2 text-shadow-xs"
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default AppHeader
