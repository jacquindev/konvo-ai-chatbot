"use client"

import { TabsSection } from "@/components/global/tabs"
import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { useQueryAllUserAppointments } from "@/hooks/queries"
import { AnimatePresence, motion } from "motion/react"
import { useParams } from "next/navigation"
import TodayBookingCard from "./_components/card"
import AppointmentsPageSkeleton from "./_components/skeleton"
import AllAppointmentsTable from "./_components/table"

const AppointmentsPage = () => {
  const { userId } = useParams()
  const { data, isLoading, isPending } = useQueryAllUserAppointments(userId as string)

  if (!data || isLoading || isPending) return <AppointmentsPageSkeleton />

  const bookings = data?.data

  const today = new Date()
  const todayBookings = bookings?.filter(booking => booking.date.getDate() === today.getDate())

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid grid-cols-1 gap-x-6 xl:grid-cols-2"
    >
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
            <AnimatePresence mode="wait">
              {todayBookings && todayBookings.length > 0 ? (
                todayBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.15, duration: 0.25, ease: "easeOut" }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <TodayBookingCard booking={booking} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="no-bookings"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                >
                  <Card className="bg-background/80 w-full text-center shadow-inner">
                    <CardHeader>
                      <CardDescription>No appointments for today.</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TabsSection>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="col-span-1"
      >
        <TabsSection title="All Appointments" description="View all your appointments here.">
          <AllAppointmentsTable bookings={bookings} />
        </TabsSection>
      </motion.div>
    </motion.div>
  )
}

export default AppointmentsPage
