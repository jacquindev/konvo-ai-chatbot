import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import React from "react"

type Props = {
  className?: string
  triggers: {
    label: string
    icon?: React.ElementType
  }[]
  children: React.ReactNode
}

const TabsMenu = ({ className, triggers, children }: Props) => {
  return (
    <Tabs defaultValue={triggers[0].label} className="w-full">
      <TabsList className={cn(className)}>
        {triggers.map((trigger, index) => (
          <TabsTrigger
            value={trigger.label}
            key={index}
            className="capitalize flex gap-2 font-semibold dark:data-[state=active]:bg-muted"
          >
            {trigger.icon && <trigger.icon style={{ width: 20, height: 20 }} />}
            {trigger.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}

export default TabsMenu
