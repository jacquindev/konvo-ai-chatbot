"use client"

import { Badge } from "@/components/ui/badge"
import { useQueryCurrentUser, useQuerySubscriptionPlan } from "@/hooks/queries"
import { cn } from "@/lib/utils"
import { InfinityIcon, Loader2 } from "lucide-react"
import { motion } from "motion/react"
import React from "react"

type CreditsType = "domain" | "contact" | "email"

type Props = {
  type: CreditsType
  userId: string
  animated?: boolean
}

// Extract limit by type
const getCreditLimit = (credits: any, type: CreditsType): number | undefined => {
  return credits?.[`${type}Limit`]
}

// Component
const PlanCredits = ({ type, userId, animated = false }: Props) => {
  const { data: user } = useQueryCurrentUser(userId)
  const plan = user?.subscription?.subscriptionPlan?.plan ?? "STANDARD"

  const { data: credits, isLoading } = useQuerySubscriptionPlan(plan)
  const limit = getCreditLimit(credits, type)
  const isUnlimited = plan === "UNLIMITED" && type !== "domain"

  const content = isLoading ? (
    <Loader2 className="animate-spin w-4 h-4" />
  ) : isUnlimited ? (
    <>
      <InfinityIcon className="w-4 h-4" />
      Credits
    </>
  ) : (
    `${limit ?? 0} Credits`
  )

  const badge = <PlanCreditsBadge>{content}</PlanCreditsBadge>

  return animated ? (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
    >
      {badge}
    </motion.div>
  ) : (
    badge
  )
}

// Reusable styled badge
const PlanCreditsBadge = ({ className, children, ...props }: React.ComponentProps<"span">) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-lg px-4 py-2 border-2 border-border bg-accent dark:bg-accent/50",
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  )
}

export default PlanCredits
