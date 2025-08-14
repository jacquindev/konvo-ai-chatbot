"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
  title: string
  description?: string
  children: React.ReactNode
  trigger?: React.ReactNode
  dangerZone?: React.ReactNode
}

const TabsSection = ({ title, description, children, trigger, dangerZone }: Props) => {
  return (
    <motion.section
      className="max-w-7xl mx-auto py-6 space-y-12"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      <motion.div variants={motionVariants}>
        <Card className="bg-primary/10 backdrop-blur-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
              {trigger && trigger}
            </div>
            <Separator className="bg-primary/20 mt-4" />
          </CardHeader>

          <CardContent className="py-6">{children}</CardContent>

          {dangerZone}
        </Card>
      </motion.div>
    </motion.section>
  )
}

export default TabsSection
