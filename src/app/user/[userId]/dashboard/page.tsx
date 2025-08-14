"use client"

import { useQueryDashboardData } from "@/hooks/queries"
import { motion, Variants } from "motion/react"
import { OverviewMetrics, PlanUsage, Transactions } from "./_components/metrics"
import DashboardSkeleton from "./_components/skeleton"

const variants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const DashboardPage = () => {
  const { data, isPending, isLoading } = useQueryDashboardData()

  if (!data || isPending || isLoading) {
    return <DashboardSkeleton variants={variants} />
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="w-full space-y-12"
    >
      <OverviewMetrics
        variants={variants}
        clients={data?.clients}
        balance={data?.balance}
        bookings={data?.bookings}
        products={data?.productsPrice}
      />

      {/* Plan Usage + Transactions */}
      <motion.div
        className="bg-primary/10 dark:bg-card/80 grid grid-cols-1 gap-8 rounded-2xl p-6 shadow-md backdrop-blur-sm lg:grid-cols-2"
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
      >
        <motion.div variants={variants}>
          <PlanUsage
            domains={data?.domains}
            domainLimit={data?.domainLimit}
            contactLimit={data?.contactLimit}
            emailLimit={data?.emailLimit}
            clients={data?.clients}
            campaigns={data?.campaigns}
          />
        </motion.div>
        <motion.div variants={variants}>
          <Transactions variants={variants} transactions={data?.transactions} />
        </motion.div>
      </motion.div>

      <motion.div variants={variants}>
        {/* TODO: DashboardChart here */}

      </motion.div>
    </motion.section>
  )
}

export default DashboardPage
