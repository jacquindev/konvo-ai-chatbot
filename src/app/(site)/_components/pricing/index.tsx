"use client"

import AppBadge from "@/components/global/app-badge"
import { CheckCircle } from "@/components/icons"
import { CardBody, CardContainer, CardItem } from "@/components/registry/3d-card"
import { buttonVariants } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { landingDescriptionStyle, landingHeadingStyle } from "@/constants/landing"
import { PRICING_CARDS } from "@/constants/pricing"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { motion } from "motion/react"
import { useState } from "react"

const switchLabel = cva("font-semibold md:text-lg")
const cardButton = cva("border-2 p-4 w-full text-center font-bold rounded-lg justify-center flex")

const Pricing = () => {
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly")

  return (
    <div className="w-screen">
      <div className="-z-100 relative h-full w-full bg-transparent">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,#dcd0ff_15%,transparent_100%)] dark:bg-[radial-gradient(circle_farthest-side,#1e1740_15%,transparent_100%)]" />
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,#dcd0ff_15%,transparent_100%)] dark:bg-[radial-gradient(circle_farthest-side,#1e1740_15%,transparent_100%)]" />
      </div>

      <motion.h2
        initial={{ opacity: 0, transform: "translateY(-100px)" }}
        animate={{ opacity: 0.5, transform: "translateY(0)" }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        transition={{
          delay: 0.3,
          type: "spring",
        }}
        className={cn(landingHeadingStyle())}
      >
        Choose what fits you right
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
        className={cn(landingDescriptionStyle(), "mt-4")}
      >
        Our straightforward pricing plans are tailored to meet your needs. If you&apos;re not ready
        to commit, you can get start for FREE.
      </motion.p>

      <div className="flex justify-center items-center space-x-4 pt-10 mx-auto">
        <span className={switchLabel()}>Monthly</span>
        <Switch
          checked={billingInterval === "yearly"}
          onCheckedChange={checked => setBillingInterval(checked ? "yearly" : "monthly")}
        />
        <span className={switchLabel()}>Yearly</span>
      </div>

      <motion.div
        initial={{ opacity: 0, transform: "translateY(-100px)" }}
        animate={{ opacity: 0.5, transform: "translateY(0)" }}
        whileInView={{ opacity: 1, transform: "translateY(0)" }}
        transition={{
          delay: 0.5,
          duration: 1,
          type: "spring",
        }}
        className="flex justify-center gap-8 flex-wrap mt-6"
      >
        {PRICING_CARDS.map(card => (
          <CardContainer className="inter-var mt-[-36]" key={card.id}>
            <CardBody
              className={cn(
                "bg-card/80 group/card relative group/card shadow-xs hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-2 w-[355px] h-auto rounded-xl p-6",
                card.isHighlight ? "border-4 border-primary shadow-2xl" : ""
              )}
            >
              <div className="pb-2 flex justify-between items-center">
                <CardItem translateZ={60} className="text-primary text-2xl font-bold">
                  {card.title}
                </CardItem>

                {card.isHighlight && (
                  <CardItem translateZ={60}>
                    <AppBadge>
                      <span className="text-xs font-medium">Most Popular</span>
                    </AppBadge>
                  </CardItem>
                )}
              </div>

              <CardItem
                translateZ={60}
                className="text-sm max-w-sm mt-2 text-slate-500 dark:text-slate-300 leading-tight"
              >
                <Tooltip>
                  <TooltipTrigger>
                    <p className="line-clamp-2 text-left">{card.description}</p>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs whitespace-pre-wrap break-words bg-primary/80 dark:bg-primary/40 backdrop-blur-lg drop-shadow-2xl border">
                    <p className="text-white">{card.description}</p>
                  </TooltipContent>
                </Tooltip>
              </CardItem>

              <CardItem translateZ={80} className="mt-4 text-4xl font-bold">
                <div className="flex flex-row items-end justify-end">
                  {card.plan === "STANDARD" ? (
                    "FREE"
                  ) : (
                    <>
                      <span>${card.price[billingInterval]}</span>
                      <span className="text-muted-foreground text-sm font-light">
                        /{billingInterval === "monthly" ? "month" : "year"}
                      </span>
                    </>
                  )}
                  {card.plan !== "STANDARD" && billingInterval === "yearly" && (
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                      className="px-2 py-0.5 ml-6 rounded-md bg-purple-400/60 text-foreground text-xs font-medium tracking-tight"
                    >
                      -12%
                    </motion.span>
                  )}
                </div>
              </CardItem>

              <CardItem translateZ={70} className="mt-4 flex flex-col items-start gap-4">
                <div>
                  {card.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle style={{ width: 20, height: 20 }} className="text-primary/90" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
              </CardItem>

              <div className="mt-8 w-full">
                <CardItem
                  translateZ={60}
                  as="a"
                  href={card.link}
                  className={cn(
                    card.isHighlight
                      ? buttonVariants({ variant: "default", size: "lg", className: cardButton() })
                      : buttonVariants({ variant: "outline", size: "lg", className: cardButton() })
                  )}
                >
                  {card.btnContext}
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </motion.div>
    </div>
  )
}

export default Pricing
