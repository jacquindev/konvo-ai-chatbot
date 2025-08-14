"use client"

import { Marquee } from "@/components/registry/marquee"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { landingDescriptionStyle, landingHeadingStyle, TESTIMONIALS } from "@/constants/landing"
import { useIsMobile } from "@/hooks/ui"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { motion } from "motion/react"
import Image from "next/image"

const backgroundEffect = cva(
  "pointer-events-none absolute inset-x-0 h-24 z-10 bg-gradient-to-b from-background to-transparent"
)

const Testimonials = () => {
  const isMobile = useIsMobile()

  return (
    <section className="relative w-full px-4 py-24 sm:px-8 bg-background">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={landingHeadingStyle()}
        >
          Loved by teams worldwide
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, transform: "translateY(-100px)" }}
          animate={{ opacity: 0.5, transform: "translateY(0)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className={cn(landingDescriptionStyle(), "max-w-lg mb-12 mt-3 text-center")}
        >
          Discover how fast-growing startups and established companies are using Konvo to elevate
          support, boost productivity, and delight users—every day.
        </motion.p>

        <div className="relative flex flex-col items-center justify-center gap-10 w-full overflow-hidden">
          {/* Background fade top and bottom */}
          <div className={cn(backgroundEffect(), "top-0")} />
          <div className={cn(backgroundEffect(), "bottom-0 rotate-180")} />

          {/* Mobile view */}
          {isMobile ? (
            <div className="flex md:hidden w-full overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 pb-4 px-1">
              <Marquee pauseOnHover className="[--duration:100s]">
                {TESTIMONIALS.map(review => (
                  <ReviewCard key={review.name + review.role} {...review} />
                ))}
              </Marquee>
            </div>
          ) : (
            // Desktop view: 3 marquee columns
            <div className="hidden md:flex h-[36rem] gap-6">
              <Marquee pauseOnHover className="[--duration:100s]" vertical>
                {TESTIMONIALS.map(review => (
                  <ReviewCard key={review.name + review.role} {...review} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:110s]" vertical reverse>
                {TESTIMONIALS.map(review => (
                  <ReviewCard key={review.name + review.role} {...review} />
                ))}
              </Marquee>
              <Marquee pauseOnHover className="[--duration:120s]" vertical>
                {TESTIMONIALS.map(review => (
                  <ReviewCard key={review.name + review.role} {...review} />
                ))}
              </Marquee>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

type TestimonialProps = {
  quote: string
  name: string
  role: string
  avatar: string
}

const ReviewCard = ({
  quote,
  name,
  role,
  avatar,
  className = "",
}: TestimonialProps & { className?: string }) => {
  return (
    <Card
      className={cn(
        "w-full max-w-[380px] bg-card/90 border border-border/60 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      <CardContent className="px-6 space-y-5">
        <div className="flex items-center gap-4">
          <Image
            src={avatar}
            width={52}
            height={52}
            alt={name}
            className="rounded-full object-cover border border-muted"
          />
          <div>
            <CardTitle className="text-base font-semibold text-foreground">{name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">{role}</CardDescription>
          </div>
        </div>
        <p className="text-[0.95rem] leading-relaxed text-foreground/80 italic">“{quote}”</p>
      </CardContent>
    </Card>
  )
}

export default Testimonials
