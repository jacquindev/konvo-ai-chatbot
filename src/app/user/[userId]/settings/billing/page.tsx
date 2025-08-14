"use client"

import Modal from "@/components/global/modal"
import { SubscriptionForm } from "@/components/global/stripe"
import { TabsSection } from "@/components/global/tabs"
import { CheckCircle } from "@/components/icons"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Skeleton } from "@/components/ui/skeleton"
import { useQueryCurrentUser } from "@/hooks/queries"
import { ChevronDown, Plus } from "lucide-react"
import { motion, Variants } from "motion/react"
import { useParams } from "next/navigation"
import { useState } from "react"

const motionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
}

const BillingSettingsPage = () => {
  const { userId } = useParams()
  const { data: userData, isLoading, isPending } = useQueryCurrentUser(userId as string)

  const loading = isLoading || isPending
  const subscription = userData?.subscription?.subscriptionPlan

  const plan = subscription?.plan ?? "STANDARD"
  const price = subscription?.price ?? 0
  const description = subscription?.description ?? ""
  const features = subscription?.features ?? []

  const [open, setOpen] = useState(false)

  return (
    <TabsSection
      title="Billing Settings"
      description="Add payment information, upgrade or modify your plan."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div className="flex-1 space-y-6" variants={motionVariants}>
          <Card>
            <CardHeader className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Current Plan</CardTitle>
                <CardDescription className="text-lg text-primary capitalize">
                  {loading ? <Skeleton className="w-24 h-5" /> : plan}
                </CardDescription>
              </div>
              {loading ? (
                <Skeleton className="h-10 w-20 rounded-md" />
              ) : (
                <div className="text-right">
                  <span className="font-bold text-4xl">{price === 0 ? "FREE" : `$${price}`}</span>
                  <span className="block text-muted-foreground text-sm">
                    {price === 0 ? "" : "/month"}
                  </span>
                </div>
              )}
            </CardHeader>

            <CardContent>
              <CardDescription className="text-sm mb-4 line-clamp-2">
                {loading ? <Skeleton className="h-4 w-64" /> : description}
              </CardDescription>

              {/* Desktop Static Features List */}
              <div className="hidden lg:flex flex-col gap-2">
                <CardDescription className="text-2xs uppercase font-medium tracking-widest text-transparent bg-gradient-to-b from-gray-300 dark:from-gray-100 to-gray-600 bg-clip-text dark:drop-shadow-[1px_1px_1px_rgba(255,255,255,0.1)]">
                  Key Features
                </CardDescription>
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-40" />
                    ))
                  : features.map((feature, i) => (
                      <motion.div
                        key={feature}
                        custom={i}
                        variants={motionVariants}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="text-primary w-5 h-5" />
                        <p className="text-sm">{feature}</p>
                      </motion.div>
                    ))}
              </div>

              {/*Mobile Collapsible Features List */}
              <div className="lg:hidden">
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium mt-4 hover:underline hover:text-primary text-gray-500 group">
                    <span className="text-2xs uppercase font-medium tracking-widest text-transparent bg-gradient-to-b from-gray-300 dark:from-gray-100 to-gray-600 bg-clip-text dark:drop-shadow-[1px_1px_1px_rgba(255,255,255,0.1)] t hover:from-purple-300 hover:to-primary hover:cursor-pointer">
                      KEY FEATURES
                    </span>
                    <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 flex flex-col gap-2">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="text-primary w-5 h-5" />
                        <p className="text-sm">{feature}</p>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={motionVariants} className="flex flex-1 items-start justify-center">
          <Modal
            open={open}
            onOpenChange={setOpen}
            trigger={
              <Card
                role="button"
                tabIndex={0}
                className="w-full h-full min-h-[240px] border-dashed border-2 hover:bg-primary/20 hover:dark:bg-primary/5  transition hover:scale-[1.02] flex flex-col items-center justify-center cursor-pointer"
              >
                <CardContent className="flex flex-col items-center gap-4 text-center">
                  <div className="rounded-full border p-2 bg-background shadow-sm">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Upgrade Plan</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Get more features, higher limits, and priority support.
                  </CardDescription>
                </CardContent>
              </Card>
            }
            title="Upgrade Your Plan"
            description="Choose a plan that fits your needs."
            className="justify-center items-center"
          >
            <SubscriptionForm />
          </Modal>
        </motion.div>
      </div>
    </TabsSection>
  )
}

export default BillingSettingsPage
