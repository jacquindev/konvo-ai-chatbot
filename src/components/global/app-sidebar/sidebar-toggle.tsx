"use client"

import { AlignLeft } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const SidebarToggle = ({ className }: { className?: string }) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={toggleSidebar}
      className={cn("border-border size-7 border", className)}
      aria-label="Toggle Sidebar"
    >
      <AlignLeft />
    </Button>
  )
}

export default SidebarToggle