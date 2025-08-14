import { Calendar, ChatRoundDot, Letter, Rocket, Settings, Widget } from "@/components/icons"
import { cva } from "class-variance-authority"

export const sidebarGroupLabelStyle = cva("text-sm uppercase font-normal")
export const sidebarMenuButtonStyle = cva("opacity-70 hover:opacity-100")

export const SIDEBAR_NAV_OPTIONS = [
  { name: "dashboard", icon: Widget },
  { name: "conversations", icon: ChatRoundDot },
  { name: "integrations", icon: Rocket },
  { name: "appointments", icon: Calendar },
  { name: "email-marketing", icon: Letter },
  { name: "settings", icon: Settings },
]
