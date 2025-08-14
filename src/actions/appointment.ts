"use server"

import prisma from "@/lib/prisma"
import { onAuthenticatedUser } from "./auth"

export const onGetAllUserAppointments = async (userId: string) => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200 || authUser.user.id !== userId) {
      return { status: 403, message: "Unauthorized" }
    }

    const appointments = await prisma.booking.findMany({
      where: {
        Customer: {
          Domain: {
            User: {
              id: userId,
            },
          },
        },
      },
      select: {
        id: true,
        slot: true,
        createdAt: true,
        updatedAt: true,
        date: true,
        email: true,
        domainId: true,
        Customer: {
          select: {
            Domain: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (appointments) {
      return { status: 200, data: appointments }
    }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Internal Server Error" }
  }
}
