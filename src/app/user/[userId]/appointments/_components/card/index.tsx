"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDateTime } from "@/lib/utils"
import { Mail } from "lucide-react"
import { motion } from "motion/react"

type Props = {
  booking: {
    date: Date
    Customer: {
      Domain: {
        name: string
      } | null
    } | null
    email: string
    slot: string
    createdAt: Date
    updatedAt: Date
    id: string
    domainId: string | null
  }
}

const TodayBookingCard = ({ booking }: Props) => {
  const date = formatDateTime(booking.date!)
  const domain = booking.Customer?.Domain?.name ?? "Unknown Domain"
  const email = booking.email ?? "user@email.com"
  const slot = booking.slot ?? "—"
  const avatarInitial = email.charAt(0).toUpperCase()

  const createdAt = formatDateTime(booking.createdAt!)
  const updatedAt = formatDateTime(booking.updatedAt!)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card className="bg-background/80 w-full border transition-all hover:shadow-md">
        <CardContent className="flex gap-4 p-4">
          {/* Slot Info (left pane) */}
          <div className="bg-primary/10 text-primary flex w-1/4 min-w-[90px] flex-col items-center justify-center rounded-md px-2 py-6 text-lg font-bold">
            <span>{slot}</span>
          </div>

          {/* Booking Info (right pane) */}
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs">Date</p>
                <p className="text-foreground text-base font-medium">{date}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-muted-foreground text-xs">Domain</p>
                <p className="max-w-[140px] truncate text-base font-medium">{domain}</p>
              </div>
            </div>

            <Separator className="my-3" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/20 flex items-center justify-center text-sm capitalize">
                    {avatarInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground truncate">{email}</span>
                </div>
              </div>

              <div className="text-muted-foreground text-right text-xs leading-tight">
                <p>
                  Created: <span className="text-foreground font-medium">{createdAt}</span>
                </p>
                <p>
                  Updated: <span className="text-foreground font-medium">{updatedAt}</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default TodayBookingCard
