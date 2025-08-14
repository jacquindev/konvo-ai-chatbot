import AppBadge from "@/components/global/app-badge"
import { Crown } from "@/components/icons"
import { SubscriptionPlanEnum } from "@prisma/client"
import React from "react"

type Props = { plan: SubscriptionPlanEnum }

const PlanBadge = ({ plan }: Props) => {
  return (
    <AppBadge>
      {plan !== "STANDARD" && <Crown className="z-10 w-4 h-4 text-yellow-400 drop-shadow-sm" />}
      <span className="z-10 relative">
        {plan === "PREMIUM" ? "Premium" : plan === "UNLIMITED" ? "Unlimited" : "Standard"}
      </span>
    </AppBadge>
  )
}

export default PlanBadge
