export const PRICING_CARDS = [
  {
    id: 1,
    title: "Standard",
    plan: "STANDARD",
    description:
      "Essential AI chat for growing businesses. Quickly embed Konvo and start engaging visitors with intelligent, automated responses.",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: ["1 domain", "10 contacts", "10 emails per month", "Email support"],
    priceId: "",
    isHighlight: false,
    btnContext: "Start for FREE",
    link: "#",
  },
  {
    id: 2,
    title: "Premium",
    plan: "PREMIUM",
    description:
      "Advanced features for scaling teams. Unlock smarter workflows, analytics, and customizable chat experiences to drive conversions.",
    price: {
      monthly: 97,
      yearly: Math.floor(97 * 12 - 97 * 12 * 0.12),
    },
    features: ["5 domains", "50 contacts", "50 emails per month", "Priority email support"],
    priceId: "",
    isHighlight: true,
    btnContext: "Get Started",
    link: "#",
  },
  {
    id: 3,
    title: "Unlimited",
    plan: "UNLIMITED",
    description:
      "Full power and flexibility. Get priority support, deep integrations, and enterprise-grade AI tailored to your brand and customers.",
    price: {
      monthly: 297,
      yearly: Math.floor(297 * 12 - 297 * 12 * 0.12),
    },
    features: [
      "10+ domains",
      "Unlimited contacts",
      "Unlimited emails per month",
      "Priority support (chat + SLA)",
    ],
    priceId: "",
    isHighlight: false,
    btnContext: "Join Now",
    link: "#",
  },
]
