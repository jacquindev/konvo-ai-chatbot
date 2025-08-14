"use client"

import AppHeader from "@/components/global/app-header"
import { useMounted } from "@/hooks/shared"
import { useIsMobile } from "@/hooks/ui"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import React, { useEffect, useState } from "react"
import ConversationMobilePanel from "./mobile-panel"
import ConversationSidebarToggle from "./sidebar-toggle"

type Props = {
  children: React.ReactNode
}

const COLLAPSED_WIDTH = 0
const DEFAULT_WIDTH = 400

const ConversationsLayout = ({ children }: Props) => {
  const isMobile = useIsMobile()
  const isMounted = useMounted()

  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)

  useEffect(() => {
    if (isMobile && mobileSheetOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileSheetOpen])

  const toggleLeftPanel = () => {
    if (!isMounted) return
    if (isMobile) {
      setMobileSheetOpen(true)
    } else {
      const nextState = !isCollapsed
      setIsCollapsed(nextState)
      setSidebarWidth(nextState ? COLLAPSED_WIDTH : DEFAULT_WIDTH)
    }
  }

  return (
    <div className="relative flex w-full rounded-xl bg-transparent pl-4 shadow-none">
      <div
        className={cn(
          "hidden h-screen overflow-hidden bg-transparent transition-all duration-200 md:flex",
          isCollapsed ? "" : "border-r"
        )}
        style={{ width: isCollapsed ? COLLAPSED_WIDTH : sidebarWidth }}
      >
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full"
            >
              ConversationMenu
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-1 flex-col min-h-0">
        <div className="flex flex-row items-center justify-between px-4">
          <AppHeader
            title="Conversations"
            description="Manage your conversations with your clients."
          />
          <ConversationSidebarToggle collapsed={isCollapsed} onClick={toggleLeftPanel} />
        </div>

        {children}
      </div>

      <ConversationMobilePanel open={mobileSheetOpen} setOpen={setMobileSheetOpen}>
        ConversationMenu
      </ConversationMobilePanel>
    </div>
  )
}

export default ConversationsLayout
