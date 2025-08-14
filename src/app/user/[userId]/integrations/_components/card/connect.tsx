"use client"

import AppButton from "@/components/global/app-button"
import AppLogo from "@/components/global/app-logo"
import CheckCircle from "@/components/icons/check-circle"
import CloudBolt from "@/components/icons/cloud-bolt"
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, Variants } from "motion/react"
import Image from "next/image"

type Props = {
  title: string
  description: string
  logo: string
  logoClassName?: string
  features: string[]
}

const featureVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
}

const IntegrationConnectNode = ({ title, description, logo, logoClassName, features }: Props) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <div className="flex items-center justify-center gap-2">
            <AppLogo type="letter-only" />
            <div className="flex size-8 flex-col text-gray-400 dark:text-gray-500">
              <ArrowRight />
              <ArrowLeft />
            </div>
            <Image
              src={logo}
              alt="Logo"
              sizes="100vw"
              width={0}
              height={0}
              className={cn("h-auto w-20 object-contain", logoClassName)}
            />
          </div>
        </DialogTitle>
        <DialogDescription className="flex flex-col items-center justify-center">
          <span className="text-foreground mt-4 text-lg font-semibold">{title}</span>
          <span className="text-muted-foreground mt-2 max-w-sm text-center text-sm leading-tight tracking-tight italic">
            {'"'}
            {description}
            {'"'}
          </span>
        </DialogDescription>

        <Separator className="mx-auto my-4 w-full" />
      </DialogHeader>

      <div className="px-2">
        <h3 className="text-primary mb-3 text-sm font-bold uppercase">Key Features</h3>
        <motion.ul initial="hidden" animate="visible" className="space-y-2">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              custom={index}
              variants={featureVariants}
              className="text-muted-foreground flex items-start gap-2 text-sm"
            >
              <CheckCircle className="text-primary mt-[2px] h-4 w-4 shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
      >
        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-4">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer rounded-md">
                Cancel
              </Button>
            </DialogClose>
            <AppButton className="flex cursor-pointer items-center gap-2">
              <>
                <CloudBolt />
                Connect
              </>
            </AppButton>
          </div>
        </DialogFooter>
      </motion.div>
    </>
  )
}

export default IntegrationConnectNode
