"use client"

import { HeroParallax } from "@/components/registry/hero-parallax"
import { PARALLAX_PRODUCTS } from "@/constants/landing"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import dynamic from "next/dynamic"

const CallToAction = dynamic(() => import("./_components/call-to-action"), { ssr: false })
const Features = dynamic(() => import("./_components/features"), { ssr: false })
const Globe3D = dynamic(() => import("./_components/features/globe-3d"), { ssr: false })
const ShowCase = dynamic(() => import("./_components/showcase"), { ssr: false })
const HowItWorks = dynamic(() => import("./_components/how-it-works"), { ssr: false })
const Clients = dynamic(() => import("./_components/clients"), { ssr: false })
const Pricing = dynamic(() => import("./_components/pricing"), { ssr: false })
const FAQs = dynamic(() => import("./_components/faqs"), { ssr: false })
const Testimonials = dynamic(() => import("./_components/testimonials"), { ssr: false })
const FooterSection = dynamic(() => import("./_components/footer"), { ssr: false })

const sectionClassName = cva("py-36 relative")

export default function Home() {
  return (
    <>
      <section className="p-px">
        <CallToAction />
      </section>

      <section className={cn(sectionClassName())}>
        <HeroParallax products={PARALLAX_PRODUCTS} />
      </section>

      <section id="features" className={cn(sectionClassName())}>
        <Features />
        <Globe3D />
      </section>

      <section className={cn(sectionClassName())}>
        <ShowCase />
      </section>

      <section className="relative w-full px-4 py-10 lg:px-24 mx-auto space-y-6">
        <Clients />
      </section>

      <section className={cn(sectionClassName())}>
        <HowItWorks />
      </section>

      <section id="pricing" className="">
        <Pricing />
      </section>

      <section className="relative w-full mx-auto">
        <Testimonials />
      </section>

      <section id="faqs" className={cn(sectionClassName())}>
        <FAQs />
      </section>

      <FooterSection />
    </>
  )
}
