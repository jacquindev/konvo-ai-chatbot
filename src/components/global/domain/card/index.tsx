"use client"

import { CardDescription, CardTitle } from "@/components/ui/card"
import { uploadImageString } from "@/lib/upload"
import { cn } from "@/lib/utils"
import { Domain } from "@prisma/client"
import { AnimatePresence, motion, Variants } from "motion/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
  domain: Partial<Domain>
}

const motionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const DomainCard = ({ domain }: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const handleDomainClick = () => {
    router.push(`${pathname}/${domain.id}`)
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div layout variants={motionVariants} initial="hidden" animate="visible" exit="exit">
        <div
          role="button"
          tabIndex={0}
          aria-label={`Manage ${domain.name}`}
          onClick={handleDomainClick}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") handleDomainClick()
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "group relative overflow-hidden cursor-pointer rounded-2xl p-4 backdrop-blur-xl shadow-md transition-all duration-300 ease-in-out w-full",
            "bg-primary/20 dark:bg-primary/15 hover:shadow-xl hover:scale-[1.02] hover:ring-2 hover:ring-primary hover:bg-accent hover:dark:bg-card",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <motion.div
            className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold">{domain.name}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground italic tracking-tight leading-tight">
                Click to manage your domain&apos;s chatbot
              </CardDescription>
            </div>

            <motion.div
              animate={isHovered ? { scale: 1.15, rotate: 9 } : { scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="shrink-0"
            >
              <Image
                src={uploadImageString(domain.icon || "")}
                alt="Domain Icon"
                width={60}
                height={60}
                className="rounded-lg border border-border shadow-md bg-background/90 dark:bg-background/40"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default DomainCard
