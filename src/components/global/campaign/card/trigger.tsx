"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn, formatDateTime } from "@/lib/utils"
import { Users } from "lucide-react"
import { motion, type HTMLMotionProps } from "motion/react"
import React from "react"

type Props = {
  name: string
  description?: string
  customers: number
  createdAt?: Date
  updatedAt?: Date
  userId: string
} & React.HTMLAttributes<HTMLDivElement> &
  HTMLMotionProps<"div">

const CampaignCardTrigger = React.forwardRef<HTMLDivElement, Props>(
  ({ name, description, customers, createdAt, updatedAt, className, userId, ...rest }, ref) => {
    return (
      <motion.div
        role="button"
        tabIndex={0}
        ref={ref}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} // easeOutCubic
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...rest}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "bg-background/80 hover:ring-primary w-full cursor-pointer rounded-xl transition-colors hover:ring-2"
          )}
        >
          <Card className="bg-background/80 w-full py-4 backdrop-blur-sm">
            {/* Header */}
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="w-full space-y-2">
                  <CardTitle className="truncate text-base font-semibold">{name}</CardTitle>
                  {description && (
                    <CardDescription className="text-muted-foreground line-clamp-2 text-sm leading-tight tracking-tight">
                      {description}
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>

            {/* Content */}
            <CardContent className="flex flex-col gap-2 pt-0">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Users className="h-5 w-5" />
                <strong className="text-foreground">{customers}</strong>{" "}
                {customers === 1 ? "customer" : "customers"}
              </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="text-muted-foreground flex items-center justify-between text-xs">
              {/* Dates */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <div className="text-foreground">Created:</div>
                  <div className="text-foreground">Updated:</div>
                </div>
                <div className="col-span-2">
                  <div>{createdAt ? formatDateTime(createdAt) : "—"}</div>
                  <div>{updatedAt ? formatDateTime(updatedAt) : "—"}</div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    )
  }
)

CampaignCardTrigger.displayName = "CampaignCardTrigger"

export default CampaignCardTrigger
