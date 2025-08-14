"use client"

import { UpgradeCard, UpgradeTrigger } from "@/components/global/stripe"
import { useMounted } from "@/hooks/shared"
import { useCollapsedSidebar } from "@/hooks/ui"
import { cn } from "@/lib/utils"

type Props = {
  userId: string
}

const NavUpgrade = ({ userId }: Props) => {
  const isCollapsed = useCollapsedSidebar()
  const isMounted = useMounted()

  if (!isMounted) return null

  return (
    <>
      <UpgradeCard userId={userId} className={cn(isCollapsed ? "hidden" : "")} />
      {isCollapsed && <UpgradeTrigger isCollapsed={isCollapsed} />}
    </>
  )
}

export default NavUpgrade
