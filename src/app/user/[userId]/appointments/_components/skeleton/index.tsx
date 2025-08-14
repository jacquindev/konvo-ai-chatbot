"use client"

import { TabsSection } from "@/components/global/tabs"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "motion/react"

const AppointmentsPageSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid grid-cols-1 gap-x-6 xl:grid-cols-2"
    >
      {/* Left Column: Today's Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="col-span-1"
      >
        <TabsSection
          title="Today's Bookings"
          description="All your bookings for today are mentioned below."
        >
          <div className="min-h-[240px] space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="bg-background/80 shadow-sm">
                <CardContent className="space-y-2 p-4">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsSection>
      </motion.div>

      {/* Right Column: All Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="col-span-1"
      >
        <TabsSection title="All Appointments" description="View all your appointments here.">
          <Card className="bg-background/80 shadow-sm">
            <CardHeader>
              <CardDescription>Loading table of appointments...</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 pt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between space-x-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/5" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsSection>
      </motion.div>
    </motion.div>
  )
}

export default AppointmentsPageSkeleton
