"use server"

import prisma from "@/lib/prisma"
import { onAuthenticatedUser } from "./auth"

export const onCreateNewCampaign = async (data: {
  message: string
  name: string
  description?: string
  customers?: string[]
}) => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403, message: "Unauthorized" }
    }

    const campaign = await prisma.user.update({
      where: { id: authUser.user.id },
      data: {
        campaigns: {
          create: data,
        },
      },
    })

    if (campaign) {
      return { status: 200, message: "Campaign created successfully" }
    }

    return { status: 400, message: "Oops! Something went wrong" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}

export const onGetAllUserCustomers = async (userId: string) => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200 || authUser.user.id !== userId) {
      return { status: 403, message: "Unauthorized" }
    }

    const customers = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        domains: {
          select: {
            customers: {
              select: {
                id: true,
                email: true,
                Domain: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (customers) {
      return { status: 200, data: customers }
    }

    return { status: 404, message: "No customers found" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}

export const onGetAllUserCampaigns = async (userId: string) => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200 || authUser.user.id !== userId) {
      return { status: 403, message: "Unauthorized" }
    }

    const campaigns = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        campaigns: {
          select: {
            id: true,
            name: true,
            description: true,
            message: true,
            customers: true,
            createdAt: true,
            updatedAt: true,
            domains: true,
          },
        },
      },
    })

    if (campaigns) {
      return { status: 200, data: campaigns }
    }

    return { status: 404, message: "No campaigns found" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}
