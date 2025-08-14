"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useIsMobile } from "@/hooks/ui"
import Autoplay from "embla-carousel-autoplay"
import { motion } from "motion/react"
import { useRef } from "react"
import FeatureCard from "./feature-card"
import { FEATURES, landingDescriptionStyle, landingHeadingStyle } from "@/constants/landing"

const Features = () => {
  const isMobile = useIsMobile()
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h2
          initial={{ opacity: 0, transform: "translateY(-100px)" }}
          animate={{ opacity: 0.5, transform: "translateY(0)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          transition={{
            delay: 0.3,
            type: "spring",
          }}
          className={landingHeadingStyle()}
        >
          Scale smarter with AI
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, transform: "translateY(-100px)" }}
          animate={{ opacity: 0.5, transform: "translateY(0)" }}
          whileInView={{ opacity: 1, transform: "translateY(0)" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            type: "spring",
          }}
          className={landingDescriptionStyle()}
        >
          From real-time chat to custom styling and full API access, Konvo helps you build truly
          smart and flexible support systems.
        </motion.p>

        {isMobile ? (
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-md mx-auto pt-16 items-center justify-center"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {FEATURES.map((feature, index) => (
                <CarouselItem key={index}>
                  <FeatureCard feature={feature} delay={index * 0.1} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-16">
            {FEATURES.map((feature, index) => (
              <FeatureCard feature={feature} key={index} delay={index * 0.1} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Features
