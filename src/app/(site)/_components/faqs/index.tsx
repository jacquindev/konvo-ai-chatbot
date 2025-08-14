"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQS_ITEMS, landingDescriptionStyle, landingHeadingStyle } from "@/constants/landing"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

const FAQs = () => {
  return (
    <div className="w-screen p-px">
      {/* BACKGROUND COLOR */}
      <div className="-z-100 relative h-full w-full bg-transparent">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,#dcd0ff_15%,transparent_100%)] dark:bg-[radial-gradient(circle_farthest-side,#1e1740_15%,transparent_100%)]" />
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,#dcd0ff_15%,transparent_100%)] dark:bg-[radial-gradient(circle_farthest-side,#1e1740_15%,transparent_100%)]" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={landingHeadingStyle()}
      >
        Frequently Asked Questions
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.9,
          ease: "easeOut",
          type: "spring",
        }}
        viewport={{ once: true }}
        className={cn(landingDescriptionStyle(), "mt-2 max-w-lg lg:max-w-4xl")}
      >
        Everything you need to know about how Konvo works, integrates, and supports your team.
      </motion.p>

      <div className="max-w-3xl mx-auto items-center mt-16 px-8">
        <Accordion type="single" collapsible>
          {FAQS_ITEMS.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export default FAQs
