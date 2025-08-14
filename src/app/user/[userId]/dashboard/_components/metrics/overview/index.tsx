"use client"

import { Calendar, Clients, DollarSign } from "@/components/icons"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUpIcon } from "lucide-react"
import { motion, Variants } from "motion/react"
import { JSX } from "react"
import CountUp from "react-countup"

type Props = {
  variants: Variants
  clients: number
  balance: number
  bookings: number
  products: number
}

const OverviewMetrics = ({ variants, clients, balance, bookings, products }: Props) => {
  const METRIC_CARDS: MetricsCardProps[] = [
    {
      title: "Potential Clients",
      value: clients,
      icon: <Clients className="h-[30px] w-[30px]" />,
    },
    {
      title: "Pipeline Value",
      value: products * clients,
      icon: <DollarSign className="h-[30px] w-[30px]" />,
      sales: true,
    },
    {
      title: "Appointments",
      value: bookings,
      icon: <Calendar className="h-[30px] w-[30px]" />,
    },
    {
      title: "Total Sales",
      value: balance,
      icon: <DollarSign className="h-[30px] w-[30px]" />,
      sales: true,
    },
  ]

  return (
    <motion.div variants={variants}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {METRIC_CARDS.map((card, index) => (
          <motion.div key={card.title} variants={variants} custom={index}>
            <MetricsCard {...card} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

type MetricsCardProps = {
  title: string
  sublabel?: string
  value: number
  icon: JSX.Element
  sales?: boolean
}

const MetricsCard = ({ title, sublabel, value, icon, sales }: MetricsCardProps) => {
  return (
    <Card
      className={cn(
        "group dark:border-border bg-primary/5 dark:bg-card/70 relative overflow-hidden border backdrop-blur-sm transition-shadow",
        "hover:ring-primary/40 hover:shadow-lg hover:ring-1"
      )}
    >
      <CardHeader className="space-y-2">
        <div className="flex flex-row items-center gap-3">
          {icon}
          <div>
            <CardDescription className="text-foreground text-xl font-medium">
              {title}
            </CardDescription>
            {sublabel && (
              <CardDescription className="text-muted-foreground flex flex-row items-center gap-2 text-sm italic">
                {sublabel} <TrendingUpIcon className="h-4 w-4" />
              </CardDescription>
            )}
          </div>
        </div>
        <CardTitle className="text-3xl font-bold tracking-tight">
          <motion.span
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {sales && "$"}
            <CountUp start={0} end={value} duration={1.2} separator="," />
          </motion.span>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default OverviewMetrics
