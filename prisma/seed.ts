import { PrismaClient, SubscriptionPlanEnum } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const plans = [
    {
      plan: SubscriptionPlanEnum.STANDARD,
      price: 0,
      domainLimit: 1,
      emailLimit: 30,
      contactLimit: 10,
      features: ["1 domain", "10 contacts", "10 emails per month", "Email support"],
      description:
        "Essential AI chat for growing businesses. Quickly embed Konvo and start engaging visitors with intelligent, automated responses.",
    },
    {
      plan: SubscriptionPlanEnum.PREMIUM,
      price: 97,
      domainLimit: 3,
      emailLimit: 60,
      contactLimit: 30,
      features: ["5 domains", "50 contacts", "50 emails per month", "Priority email support"],
      description:
        "Advanced features for scaling teams. Unlock smarter workflows, analytics, and customizable chat experiences to drive conversions.",
    },
    {
      plan: SubscriptionPlanEnum.UNLIMITED,
      price: 297,
      domainLimit: 10,
      emailLimit: null,
      contactLimit: null,
      features: [
        "10 domains",
        "Unlimited contacts",
        "Unlimited emails per month",
        "Priority support (chat + SLA)",
      ],
      description:
        "Full power and flexibility. Get priority support, deep integrations, and enterprise-grade AI tailored to your brand and customers.",
    },
  ]

  for (const data of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { plan: data.plan },
      update: {
        price: data.price,
        domainLimit: data.domainLimit,
        emailLimit: data.emailLimit,
        contactLimit: data.contactLimit,
        features: data.features,
        description: data.description,
      },
      create: data,
    })
  }

  console.log("✅ Subscription table seeded successfully.")
}

main()
  .catch(error => {
    console.error("❌ Error seeding subscription table:", error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
