"use client"

import ProgressBar from "@/components/global/progress-bar"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useThemeMode } from "@/hooks/ui"
import { ChartNoAxesGanttIcon } from "lucide-react"

type Props = {
  domains: number
  domainLimit: number
  clients: number
  contactLimit: number
  campaigns: number
  emailLimit: number
}

const PlanUsage = ({
  domains,
  domainLimit,
  clients,
  contactLimit,
  campaigns,
  emailLimit,
}: Props) => {
  const { theme } = useThemeMode()

  return (
    <Card className="border-none bg-transparent p-0 shadow-none">
      <CardHeader className="p-0">
        <div className="mb-2 flex flex-row items-center gap-3">
          <div className="border-border text-muted-foreground flex aspect-square h-10 w-10 items-center justify-center rounded-md border p-1">
            <ChartNoAxesGanttIcon className="h-7 w-7" />
          </div>
          <div>
            <CardTitle className="text-xl">Plan Usage</CardTitle>
            <CardDescription>A detailed look at your usage and quota.</CardDescription>
          </div>
        </div>
        <Separator className="bg-primary/30 mx-auto" />
      </CardHeader>

      <div className="flex flex-col gap-5 py-6">
        <ProgressBar
          label="Domains"
          end={domainLimit}
          credits={domains}
          color={theme === "dark" ? "var(--chart-1)" : undefined}
        />
        <ProgressBar
          label="Clients"
          end={contactLimit}
          credits={clients}
          color={theme === "dark" ? "var(--chart-3)" : undefined}
        />
        <ProgressBar
          label="Campaigns"
          end={emailLimit}
          credits={campaigns}
          color={theme === "dark" ? "var(--chart-5)" : undefined}
        />
      </div>
    </Card>
  )
}

export default PlanUsage
