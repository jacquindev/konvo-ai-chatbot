"use client"

import AppTooltip from "@/components/global/app-tooltip"
import UploadWidget from "@/components/global/upload-widget"
import Bot from "@/components/icons/bot"
import { Lens } from "@/components/registry/lens"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useThemeMode } from "@/hooks/ui"
import { uploadImageString } from "@/lib/upload"
import { getContrastColor } from "@/lib/utils"
import { ChatBot } from "@prisma/client"
import { useState } from "react"
import { FieldErrors, FieldValues, useFormContext, UseFormRegister } from "react-hook-form"

type Props = {
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  chatBot: Partial<ChatBot>
}

const ChatBotIcon = ({ register, errors, chatBot }: Props) => {
  const hasIcon = Boolean(chatBot.icon)

  const { watch } = useFormContext()
  const { theme } = useThemeMode()

  const [hoveringIcon, setHoveringIcon] = useState(false)
  const [hoveringBubble, setHoveringBubble] = useState(false)

  const defaultBubbleBg = theme === "dark" ? "#a48fff" : "#6e56cf"
  const background = watch("background") || "linear-gradient(to top left,#ff00cc,#333399)"
  const bubbleBg = watch("textColor") || defaultBubbleBg

  // Compute welcome message with fallbacks
  const watchedMessage = watch("welcomeMessage")?.trim()
  const welcomeMessage =
    watchedMessage || chatBot.welcomeMessage?.trim() || "Hello! How can I help you today?"

  const backgroundTextColor = getContrastColor(background)
  const bubbleTextColor = getContrastColor(bubbleBg)

  return (
    <Card className="flex flex-col gap-4 border-none bg-transparent p-0 shadow-none">
      <CardHeader className="flex items-center gap-2 p-0">
        <CardTitle>Bot&apos;s Icon</CardTitle>
        <AppTooltip content="This image will be displayed in the chatbot's interface." />
      </CardHeader>

      <UploadWidget register={register} errors={errors} label="Edit Icon" className="mt-[-8]" />

      {/* Preview: Avatar + Bubble */}
      <div className="relative">
        <div className="bg-background sticky top-4 z-10 flex items-center justify-between gap-4 rounded-lg border p-4 shadow-sm">
          <Lens hovering={hoveringIcon} setHovering={setHoveringIcon}>
            <Avatar className="border-border h-24 w-24 flex-shrink-0 border shadow-lg">
              {hasIcon ? (
                <AvatarImage
                  src={uploadImageString(chatBot.icon!, { crop: true })}
                  alt="chatbot trigger"
                  width={80}
                  height={80}
                  loading="lazy"
                  style={{ background }}
                />
              ) : (
                <AvatarFallback style={{ background }} className="flex items-center justify-center">
                  <Bot className="h-15 w-15" style={{ color: backgroundTextColor }} />
                </AvatarFallback>
              )}
            </Avatar>
          </Lens>

          <Lens hovering={hoveringBubble} setHovering={setHoveringBubble}>
            <div
              className="relative max-w-xs min-w-xs rounded-lg px-4 py-3 wrap-anywhere shadow-2xl transition-shadow duration-300"
              style={{
                background: bubbleBg,
                color: bubbleTextColor,
                boxShadow: `
                  0 4px 6px rgba(0, 0, 0, 0.15),
                  inset 0 2px 4px rgba(255, 255, 255, 0.25),
                  inset 0 -2px 4px rgba(0, 0, 0, 0.15)
                  `,
              }}
              aria-label="Chat message preview bubble"
            >
              <p className="text-base select-none">{welcomeMessage}</p>
            </div>
          </Lens>
        </div>
      </div>
    </Card>
  )
}

export default ChatBotIcon
