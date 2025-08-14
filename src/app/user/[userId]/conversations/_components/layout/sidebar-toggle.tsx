"use client"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/ui"
import { Menu } from "lucide-react"

type Props = {
  collapsed: boolean
  onClick: () => void
}

const ConversationSidebarToggle = ({ collapsed, onClick }: Props) => {
  const isMobile = useIsMobile()

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClick}
              className="text-muted-foreground gap-1"
            >
              <Menu className="h-4 w-4" />
              {isMobile ? "Menu" : collapsed ? "Expand" : "Collapse"}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {isMobile ? "Menu" : collapsed ? "Expand Menu" : "Collapse Menu"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}

export default ConversationSidebarToggle
