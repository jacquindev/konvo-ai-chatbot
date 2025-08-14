"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Variants, motion } from "motion/react"

const DashboardSkeleton = ({ variants }: { variants: Variants }) => {
  return (
    <motion.section
      className="mt-8 w-full space-y-8 px-4 pb-10 md:px-8"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {/* Overview Cards */}
      <motion.div className="space-y-2" variants={variants} custom={0}>
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div key={i} variants={variants} custom={i}>
              <div className="bg-muted dark:bg-card space-y-4 rounded-lg p-4 shadow">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Plan Usage & Transactions */}
      <motion.div
        className="grid grid-cols-1 gap-12 lg:grid-cols-2"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        {/* Plan Usage Skeleton */}
        <motion.div className="space-y-4" variants={variants} custom={1}>
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-60" />
          <div className="flex flex-col gap-5 pt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-4 w-32" />
                <div className="flex justify-between text-sm">
                  <Skeleton className="h-3 w-6" />
                  <Skeleton className="h-3 w-6" />
                </div>
                <Skeleton className="h-3 w-full rounded" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Transactions Skeleton */}
        <motion.div className="space-y-4" variants={variants} custom={2}>
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-60" />
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between border-b py-2"
              variants={variants}
              custom={i}
            >
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-16" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default DashboardSkeleton
