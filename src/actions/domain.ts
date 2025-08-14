"use server"

import prisma from "@/lib/prisma"
import { onAuthenticatedUser } from "./auth"

export const onGetAllUserDomains = async () => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403, message: "Unauthorized" }
    }

    const userId = authUser.user.id
    const domains = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        domains: {
          include: {
            customers: true,
            products: true,
            helpDesk: true,
            filterQuestions: true,
            bookings: true,
          },
        },
      },
    })

    if (domains) {
      return { status: 200, data: domains }
    }

    return { status: 404, message: "No domains found" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal server error" }
  }
}

export const onIntegrateDomain = async (domain: string, icon: string) => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403, message: "Unauthorized" }
    }

    const userId = authUser.user.id

    const existingDomain = await prisma.domain.findFirst({
      where: { userId, name: domain },
    })

    if (existingDomain) {
      return { status: 200, data: existingDomain, message: "Domain already exists" }
    }

    const subscription = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        _count: {
          select: { domains: true },
        },
        subscription: {
          select: {
            subscriptionPlan: {
              select: {
                domainLimit: true,
              },
            },
          },
        },
      },
    })

    const currentDomainCount = subscription?._count.domains ?? 0
    const currentDomainLimit = subscription?.subscription?.subscriptionPlan?.domainLimit ?? 1

    if (currentDomainCount >= currentDomainLimit) {
      return {
        status: 400,
        message:
          "You've reached the maximum number of domains. Please upgrade your plan to continue",
      }
    }

    const newDomain = await prisma.domain.create({
      data: {
        userId,
        name: domain,
        icon,
        chatBot: {
          create: {},
        },
      },
    })

    return newDomain
      ? { status: 201, message: "Domain added successfully", data: newDomain }
      : { status: 400, message: "Oops! Something went wrong" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal server error" }
  }
}

export const onRemoveDomain = async (domainId: string) => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403, message: "Unauthorized" }
    }

    const userId = authUser.user.id

    const deleted = await prisma.domain.delete({
      where: { userId, id: domainId },
      select: { name: true },
    })

    if (deleted) {
      return { status: 200, message: `Domain: ${deleted.name} deleted successfully` }
    }

    return { status: 400, mesage: "Oops! Something went wrong" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal server error" }
  }
}

export const onGetCurrentDomainInfo = async (domainId: string) => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403, message: "Unauthorized" }
    }

    const userId = authUser.user.id

    const currentDomain = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        subscription: {
          select: { subscriptionPlan: { select: { plan: true } } },
        },
        domains: {
          where: { id: { equals: domainId } },
          select: {
            id: true,
            name: true,
            icon: true,
            products: true,
            chatBot: {
              select: {
                id: true,
                welcomeMessage: true,
                icon: true,
                theme: true,
                botBackground: true,
                textColor: true,
                bubbleColor: true,
              },
            },
            customers: {
              select: {
                chatRooms: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
            helpDesk: true,
            filterQuestions: true,
          },
        },
      },
    })

    if (currentDomain) {
      return {
        status: 200,
        data: {
          domain: currentDomain.domains[0],
          subscription: currentDomain.subscription?.subscriptionPlan,
          user: currentDomain,
        },
      }
    }

    return { status: 404 }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

export const onUpdateDomainName = async (domainId: string, name: string) => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403, message: "Unauthorized" }
    }

    // Check if the domain already exists
    const existing = await prisma.domain.findFirst({
      where: {
        name: { contains: name },
        NOT: { id: domainId },
      },
    })

    if (existing) {
      return { status: 400, message: `Domain with name ${name} already exists` }
    }

    await prisma.domain.update({
      where: { id: domainId },
      data: { name },
    })

    return { status: 200, message: "Domain name updated successfully" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}
