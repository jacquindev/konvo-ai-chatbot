"use server"

import prisma from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import { onAuthenticatedUser } from "./auth"

export const onGetUserClients = async () => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403 }
    }

    const userId = authUser.user.id

    const clients = await prisma.customer.count({
      where: {
        Domain: {
          User: { id: userId },
        },
      },
    })
    if (clients) {
      return { status: 200, data: clients }
    }

    return { status: 404 }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

export const onGetUserBalance = async () => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403 }
    }

    const balance = await prisma.user.findUnique({
      where: { id: authUser.user.id },
      select: { stripeConnectId: true },
    })

    if (balance) {
      const transactions = await stripe.balance.retrieve({
        stripeAccount: balance.stripeConnectId!,
      })

      if (transactions) {
        const sales = transactions.pending.reduce((acc, curr) => {
          return acc + curr.amount
        }, 0)

        const earnings = sales / 100

        return { status: 200, data: earnings }
      }
    }

    return { status: 404 }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

export const onGetUserBookings = async () => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403 }
    }

    const bookings = await prisma.booking.count({
      where: {
        Customer: {
          Domain: {
            User: {
              id: authUser.user.id,
            },
          },
        },
      },
    })

    if (bookings) {
      return { status: 200, data: bookings }
    }

    return { status: 404 }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

export const onGetUserProductsPrice = async () => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403 }
    }

    const products = await prisma.product.findMany({
      where: {
        Domain: {
          User: {
            id: authUser.user.id,
          },
        },
      },
      select: {
        price: true,
      },
    })

    if (products) {
      const total = products.reduce((acc, curr) => {
        return acc + curr.price
      }, 0)

      return { status: 200, data: total }
    }

    return { status: 404 }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

export const onGetUserDomains = async () => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403 }
    }

    const domains = await prisma.domain.count({
      where: {
        User: {
          id: authUser.user.id,
        },
      },
    })

    if (domains) {
      return { status: 200, data: domains }
    }

    return { status: 404 }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

export const onGetUserCredits = async () => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403 }
    }

    const currentPlan = await prisma.user.findUnique({
      where: { id: authUser.user.id },
      select: {
        subscription: {
          select: {
            subscriptionPlan: {
              select: {
                domainLimit: true,
                emailLimit: true,
                contactLimit: true,
              },
            },
          },
        },
      },
    })

    if (currentPlan) {
      return {
        status: 200,
        data: {
          emailLimit: currentPlan?.subscription?.subscriptionPlan?.emailLimit,
          domainLimit: currentPlan?.subscription?.subscriptionPlan?.domainLimit,
          contactLimit: currentPlan?.subscription?.subscriptionPlan?.contactLimit,
        },
      }
    }

    return { status: 404 }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

export const onGetUserCampaigns = async () => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403 }
    }

    const campaigns = await prisma.campaign.count({
      where: {
        User: {
          id: authUser.user.id,
        },
      },
    })

    if (campaigns) {
      return { status: 200, data: campaigns }
    }

    return { status: 404 }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

export const onGetUserTransactions = async () => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403 }
    }

    const connectedStripe = await prisma.user.findUnique({
      where: { id: authUser.user.id },
      select: { stripeConnectId: true },
    })

    if (connectedStripe) {
      const transactions = await stripe.charges.list({
        stripeAccount: connectedStripe.stripeConnectId!,
      })

      if (transactions) {
        return { status: 200, data: transactions.data }
      }
    }

    return { status: 404 }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

/* export const onGetUserTransactions = async () => {
  try {
    const authUser = await onAuthenticatedUser()
    if (!authUser.user || authUser.status !== 200) {
      return { status: 403 }
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.user.id },
      select: { stripeConnectId: true },
    })

    if (!user?.stripeConnectId) return { status: 404 }

    const charges = await stripe.charges.list({
      stripeAccount: user.stripeConnectId,
    })

    const enrichedTxs = await Promise.all(
      charges.data.map(async (charge) => {
        const metadata = charge.metadata

        const [domain, customer, product] = await Promise.all([
          metadata.domainId ? prisma.domain.findUnique({ where: { id: metadata.domainId } }) : null,
          metadata.customerId ? prisma.customer.findUnique({ where: { id: metadata.customerId } }) : null,
          metadata.productId ? prisma.product.findUnique({ where: { id: metadata.productId } }) : null,
        ])

        return {
          id: charge.id,
          amount: charge.amount,
          created: charge.created,
          domainName: domain?.name ?? "Unknown Domain",
          customerName: customer?.email ?? "Anonymous",
          productIcon: product?.image ?? null,
        }
      })
    )

    return { status: 200, data: enrichedTxs }
  } catch (error) {
    console.error(error)
    return { status: 500 }
  }
}

 */