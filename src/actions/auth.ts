"use server"

import prisma from "@/lib/prisma"
import { clerkClient, currentUser } from "@clerk/nextjs/server"

export const onAuthenticatedUser = async () => {
  try {
    const authUser = await currentUser()
    if (!authUser) {
      return { status: 403, message: "Unauthorized" }
    }

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: authUser.id },
      select: {
        clerkId: true,
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        stripeConnectId: true,
        subscription: {
          select: {
            subscriptionPlanId: true,
          },
        },
      },
    })

    if (existingUser) {
      return {
        status: 200,
        user: existingUser,
        message: `Welcome back, ${existingUser.firstName}`,
      }
    }

    // Fetch the Standard subscription plan
    const standardPlan = await prisma.subscriptionPlan.findUnique({
      where: { plan: "STANDARD" },
    })

    if (!standardPlan) {
      return { status: 404, message: "Standard plan not found" }
    }

    // Create new user and their subscription in a transaction
    const newUser = await prisma.user.create({
      data: {
        clerkId: authUser.id,
        email: authUser.emailAddresses[0]?.emailAddress ?? "",
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        avatar: authUser.imageUrl,
        subscription: {
          create: {
            subscriptionPlanId: standardPlan.id,
          },
        },
      },
      select: {
        id: true,
        clerkId: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        stripeConnectId: true,
        subscription: {
          select: {
            subscriptionPlanId: true,
          },
        },
      },
    })

    return {
      status: 201,
      user: newUser,
      message: `Welcome to Konvo, ${newUser.firstName}!`,
    }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}

export const onUpdateUserAvatar = async (imageUrl: string) => {
  try {
    const user = await currentUser()
    if (!user) {
      return { status: 403, message: "Unauthorized" }
    }

    const response = await fetch(imageUrl)
    const blob = await response.blob()

    // Update Clerk profile image with blob
    const client = await clerkClient()
    await client.users.updateUserProfileImage(user.id, { file: blob })

    // Store Uploadcare URL in DB
    await prisma.user.update({
      where: { clerkId: user.id },
      data: { avatar: imageUrl },
    })

    return { status: 200, message: "Avatar updated" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}

export const onUpdateUserName = async (firstName?: string, lastName?: string) => {
  try {
    const user = await currentUser()
    if (!user) {
      return { status: 403, message: "Unauthorized" }
    }

    const client = await clerkClient()
    const updateData: { firstName?: string; lastName?: string } = {}

    if (firstName) updateData.firstName = firstName
    if (lastName) updateData.lastName = lastName

    if (Object.keys(updateData).length > 0) {
      await client.users.updateUser(user.id, updateData)
      await prisma.user.update({
        where: { clerkId: user.id },
        data: updateData,
      })
    }

    return { status: 200, message: "Your name updated successfully" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}

export const onUpdateUserPassword = async (password: string) => {
  try {
    const user = await currentUser()
    if (!user) {
      return { status: 403, message: "Unauthorized" }
    }

    const client = await clerkClient()
    const updated = await client.users.updateUser(user.id, { password })

    if (updated) {
      return { status: 200, message: "New password updated successfully" }
    }

    return { status: 400, message: "Oops! Something went wrong" }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}

export const onGetCurrentUserInfo = async (userId: string) => {
  try {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscription: {
          select: {
            subscriptionPlan: {
              select: { plan: true, description: true, price: true, features: true },
            },
          },
        },
        avatar: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    })
  } catch (error) {
    console.error(error)
  }
}
