"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import React from "react"
import { motion, Variants } from "motion/react"

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

type Props = {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

const DangerZone = ({
  title = "Danger Zone",
  description = "This action cannot be undone. This will permanently delete all your data from our server.",
  children,
  className,
}: Props) => {
  return (
    <motion.div variants={motionVariants} className={cn(className)}>
      <Card className="border border-destructive bg-destructive/10">
        <CardHeader className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-1">
            <CardTitle className="text-destructive text-lg">{title}</CardTitle>
            <CardDescription className="max-w-4xl text-muted-foreground">
              {description}
            </CardDescription>
          </div>

          <div>{children}</div>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

export const DangerZoneButton = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Button
      variant="destructive"
      className={cn("hover:scale-[1.02] transition-transform cursor-pointer", className)}
    >
      {children}
    </Button>
  )
}

export default DangerZone
