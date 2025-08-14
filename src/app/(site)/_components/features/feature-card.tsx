"use client"

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"
import React from "react"

type Props = {
  feature: {
    title: string
    description: string
    icon: React.ElementType
  }
  delay: number
}

const FeatureCard = ({ feature, delay }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Card className="relative h-full border dark:border-border border-primary/20 shadow-md rounded-2xl backdrop-blur-lg hover:shadow-lg transition-all duration-300 overflow-hidden p-2 bg-gradient-to-b from-violet-200 dark:from-violet-950/50 to-transparent">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shadow-inner">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg font-semibold text-foreground">
                {feature.title}
              </CardTitle>
            </div>
          </div>
          <CardDescription className="text-sm text-gray-800 dark:text-muted-foreground leading-relaxed">
            {feature.description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default FeatureCard
