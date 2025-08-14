"use client"

import AppButton from "@/components/global/app-button"
import Modal from "@/components/global/modal"
import { SubscriptionForm } from "@/components/global/stripe"
import { MagicCard } from "@/components/registry/magic-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useQueryCurrentUser } from "@/hooks/queries"
import { useThemeMode } from "@/hooks/ui"
import { cn } from "@/lib/utils"
import { CircleFadingArrowUp } from "lucide-react"

type Props = {
  userId: string
  className?: string
}

const UpgradeCard = ({ userId, className }: Props) => {
  const { theme } = useThemeMode()
  const { data: user, isLoading, isPending, isError } = useQueryCurrentUser(userId)

  if (!user || isLoading || isPending || isError) return null

  const plan = user?.subscription?.subscriptionPlan?.plan
  if (plan !== "STANDARD") return null

  return (
    <Card className={cn("p-0 max-w-sm w-full shadow-none border-none", className)}>
      <MagicCard
        gradientFrom={theme === "dark" ? "rgb(168, 85, 247)" : "rgb(139, 92, 246)"}
        gradientTo={theme === "dark" ? "rgb(79, 70, 229)" : "rgb(99, 102, 241)"}
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-0 dark:border-none border border-border"
      >
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-semibold">
            Upgrade to{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-500">
              Premium
            </span>
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-muted-foreground leading-snug">
            Unlock advanced features and level up your experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <UpgradeTrigger />
        </CardContent>
      </MagicCard>
    </Card>
  )
}

export const UpgradeTrigger = ({ isCollapsed }: { isCollapsed?: boolean }) => {
  return (
    <Modal
      trigger={
        isCollapsed ? (
          <AppButton className="rounded-full w-8 h-8 cursor-pointer">
            <CircleFadingArrowUp />
          </AppButton>
        ) : (
          <AppButton className="w-full rounded-full cursor-pointer">Upgrade</AppButton>
        )
      }
      title="Upgrade Your Plan"
      description="Choose a plan that fits you right."
    >
      <SubscriptionForm />
    </Modal>
  )
}

export default UpgradeCard
