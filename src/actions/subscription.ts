"use server"

import prisma from "@/lib/prisma"
import { SubscriptionPlanEnum } from "@prisma/client"

export const onGetSubscriptionPlan = async (plan: SubscriptionPlanEnum) => {
  try {
    return await prisma.subscriptionPlan.findUnique({
      where: { plan },
      select: {
        domainLimit: true,
        emailLimit: true,
        contactLimit: true,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
