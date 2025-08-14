import { CreditCard, Globe, Help, Home, StarCircle } from "@/components/icons"
import { uploadImageString } from "@/lib/upload"
import { cva } from "class-variance-authority"
import { BarChart, Code, GlobeIcon, MessageCircle, Palette, Sparkles } from "lucide-react"

import clients from "@/data/clients.json"
import faqs from "@/data/faqs.json"
import features from "@/data/features.json"
import products from "@/data/parallax-products.json"
import showcases from "@/data/showcases.json"
import testimonials from "@/data/testimonials.json"

const IconMapping = {
  MessageCircle,
  GlobeIcon,
  Code,
  Palette,
  BarChart,
  Sparkles,
}

// Common styling
export const landingHeadingStyle = cva(
  "bg-gradient-to-t dark:bg-gradient-to-b from-slate-800 dark:from-slate-300 to-slate-400 dark:to-slate-700 bg-clip-text text-transparent text-center font-medium text-[40px] tracking-tight md:text-6xl py-2"
)
export const landingDescriptionStyle = cva(
  "leading-tight text-gray-800 dark:text-muted-foreground text-center max-w-sm md:max-w-2xl lg:text-lg mx-auto"
)

export const FAQS_ITEMS = faqs.map(item => ({ ...item }))

export const SHOWCASES = showcases.map(item => ({ ...item }))

export const FEATURES = features.map(item => ({
  ...item,
  icon: IconMapping[item.icon as keyof typeof IconMapping],
}))

export const PARALLAX_PRODUCTS = products.map(item => ({
  ...item,
  thumbnail: uploadImageString(item.thumbnailId),
}))

export const CLIENTS = clients.map(item => ({
  href: uploadImageString(item.thumbnailId),
}))

export const TESTIMONIALS = testimonials.map(item => ({
  ...item,
  avatar: uploadImageString(item.thumbnailId, { size: "1000x1000" }),
}))

export const FOOTER_NAV_MIDDLE_ITEMS = [
  {
    id: 1,
    label: "Pricing",
    path: "#pricing",
  },
  {
    id: 2,
    label: "Blog",
    path: "/newsroom",
  },
  {
    id: 3,
    label: "Contact",
    path: "#",
  },
]

export const FOOTER_NAV_TERMS_ITEMS = [
  {
    id: 1,
    label: "Terms & Conditions",
    path: "#",
  },
  {
    id: 2,
    label: "Privacy Policy",
    path: "#",
  },
]

export const LANDING_NAV_MENU = [
  {
    label: "Home",
    icon: Home,
    path: "/",
    section: true,
  },
  {
    label: "Pricing",
    icon: CreditCard,
    path: "#pricing",
    section: true,
  },
  {
    label: "Features",
    icon: StarCircle,
    path: "#features",
    section: true,
  },
  {
    label: "News Room",
    icon: Globe,
    path: "/news-room",
  },
  {
    label: "FAQs",
    icon: Help,
    path: "#faqs",
    section: true,
  },
]
