"use client"

import AppButton from "@/components/global/app-button"
import { CloudBolt } from "@/components/icons"
import { InteractiveHoverButton } from "@/components/registry/interactive-hover-button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useMounted } from "@/hooks/shared"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import Image from "next/image"
import IntegrationConnectNode from "./connect"

type Props = {
  title: string
  titleClassName?: string
  description: string
  logo: string
  logoClassName?: string
  learnMoreLink?: string
  connectCTA: {
    title: string
    description: string
    logo: string
    features: string[]
  }
}

const IntegrationCard = ({
  title,
  titleClassName,
  description,
  logo,
  logoClassName,
  learnMoreLink = "#",
  connectCTA,
}: Props) => {
  const isMounted = useMounted()
  if (!isMounted) return null

  const onLearnMore = () => {
    window.open(learnMoreLink, "_blank")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "bg-card/80 flex min-h-[240px] w-full justify-center rounded-xl p-2 shadow-md backdrop-blur-sm transition-colors",
          "hover:ring-primary hover:ring-2"
        )}
      >
        {/* Top Right Logo */}
        <div className="absolute top-4 right-4">
          <Image
            src={logo}
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            className={cn("h-auto w-20 object-contain", logoClassName)}
          />
        </div>

        <CardHeader className="p-2">
          <CardTitle>
            <span className={cn("text-2xl leading-tight font-bold tracking-wide", titleClassName)}>
              {title}
            </span>
          </CardTitle>
          <CardDescription className="text-muted-foreground line-clamp-3 w-full pt-6 text-sm wrap-anywhere">
            {description}
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-4 mb-2 px-2">
          <div className="flex w-full items-center justify-between gap-4">
            <InteractiveHoverButton onClick={onLearnMore}>Learn More</InteractiveHoverButton>

            <Dialog>
              <DialogTrigger asChild>
                <AppButton className="flex cursor-pointer items-center gap-2 rounded-full">
                  <CloudBolt style={{ width: 24, height: 24 }} />
                  Connect
                </AppButton>
              </DialogTrigger>
              <DialogContent className="dark:bg-card/50 backdrop-blur-md">
                <IntegrationConnectNode
                  title={connectCTA.title}
                  description={connectCTA.description}
                  logo={connectCTA.logo}
                  features={connectCTA.features}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default IntegrationCard

export { default as ComingSoonCard } from "./coming-soon"
