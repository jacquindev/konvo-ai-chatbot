"use client"

import LinkDetection from "@/components/global/link-detection"
import ChatRoundDot from "@/components/icons/chat-round-dot"
import Help from "@/components/icons/help"
import { CardContainer, CardItem } from "@/components/registry/3d-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MOCK_PANEL_MESSAGES, MOCK_PANEL_USER_IMAGES } from "@/constants/chatbot"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Paperclip, SendHorizonal, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"

type ChatBotPanelProps = {
  isLanding?: boolean
}

// Type for mock messages
interface PanelMessage {
  id: string | number
  sender: string
  content: string
  time: string
}

// Message bubble subcomponent
const MessageBubble = ({
  msg,
  isUser,
  avatarSrc,
}: {
  msg: PanelMessage
  isUser: boolean
  avatarSrc: string
}) => (
  <motion.div
    key={msg.id}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className={cn("flex items-end gap-2", isUser ? "justify-start" : "justify-end")}
  >
    {isUser && (
      <Avatar>
        <AvatarImage src={avatarSrc} alt="User Avatar" loading="lazy" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    )}
    <div
      className={cn("flex flex-col space-y-1 max-w-[75%]", isUser ? "items-start" : "items-end")}
    >
      <div
        className={cn(
          "rounded-xl px-4 py-2 text-sm whitespace-pre-wrap",
          isUser
            ? "bg-gray-300 dark:bg-muted text-black dark:text-white"
            : "bg-primary dark:text-black text-white"
        )}
      >
        <LinkDetection content={msg.content} />
      </div>
      <p className="text-xs text-muted-foreground">{msg.time}</p>
    </div>
    {!isUser && (
      <Avatar>
        <AvatarImage src={avatarSrc} alt="Bot Avatar" loading="lazy" />
        <AvatarFallback>KV</AvatarFallback>
      </Avatar>
    )}
  </motion.div>
)

const ChatBotPanel = ({ isLanding = false }: ChatBotPanelProps) => {
  const [showNotice, setShowNotice] = useState(true)
  const [visibleCount, setVisibleCount] = useState(0)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const userAvatar = "https://api.samplefaces.com/face?width=150"
  const botAvatar = "https://github.com/shadcn.png"

  // Auto scroll inside message container when visibleCount changes
  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [visibleCount])

  // Loop showing messages one by one
  useEffect(() => {
    const totalMessages = MOCK_PANEL_MESSAGES.length
    if (visibleCount >= totalMessages) {
      const timeout = setTimeout(() => setVisibleCount(0), 4000)
      return () => clearTimeout(timeout)
    }
    const timer = setTimeout(() => setVisibleCount(count => count + 1), 1800)
    return () => clearTimeout(timer)
  }, [visibleCount])

  const handleCloseNotice = useCallback(() => setShowNotice(false), [])

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <CardContainer className="inter-var">
        <CardItem translateZ={60} className="flex flex-col items-center gap-4">
          <div className="w-full max-w-sm min-w-sm">
            {/* Gradient Glow Background */}
            <div className="absolute inset-0 rounded-[1.5rem] blur-2xl opacity-30 z-[-1] animate-[gradient-glow_12s_ease-in-out_infinite] bg-[conic-gradient(at_top_right,var(--chart-3),var(--primary),var(--chart-2),var(--ring),var(--chart-1))]" />
            <div className="relative p-[2px] rounded-[1.5rem] bg-background dark:bg-card shadow-[0_0_12px_1px_var(--primary)]">
              <div className="mx-auto bg-background dark:bg-card backdrop-blur-2xl rounded-[1.4rem] overflow-hidden shadow-xl flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={botAvatar}
                        alt="Bot Avatar"
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center">
                      <h2 className="font-semibold text-sm sm:text-base">Sales Rep – Assistant</h2>
                      <p className="text-xs text-muted-foreground mt-[-4]">Konvo</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 px-2 py-[3px] text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary dark:text-foreground rounded-md">
                          <ChatRoundDot className="w-4 h-4" />
                          Chat
                        </div>
                        <button
                          className="flex items-center gap-1 px-2 py-[3px] text-xs text-muted-foreground hover:bg-muted rounded-md transition"
                          aria-label="Help Desk"
                        >
                          <Help className="w-4 h-4" />
                          Help Desk
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {MOCK_PANEL_USER_IMAGES.map((src, i) => (
                      <Image
                        key={i}
                        src={src}
                        alt="User"
                        width={28}
                        height={28}
                        className="rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                </header>
                {/* Messages */}
                <section
                  ref={messagesContainerRef}
                  className="flex-1 px-2 py-8 space-y-4 overflow-y-auto scroll-smooth min-h-[420px] max-h-[420px]"
                  aria-live="polite"
                >
                  <AnimatePresence>
                    {MOCK_PANEL_MESSAGES.slice(0, visibleCount).map((msg: PanelMessage) => {
                      const isUser = msg.sender === "user"
                      const avatarSrc = isUser ? userAvatar : botAvatar
                      return (
                        <MessageBubble
                          key={msg.id}
                          msg={msg}
                          isUser={isUser}
                          avatarSrc={avatarSrc}
                        />
                      )
                    })}
                  </AnimatePresence>
                </section>
                {/* Input */}
                <form
                  className="border-t border-border p-2 flex items-start gap-2 bg-muted/50 h-[100px]"
                  onSubmit={e => e.preventDefault()}
                  aria-label="Chat input"
                >
                  <div className="relative flex-1">
                    <input
                      placeholder="Type your message"
                      className="pr-10 pl-3 py-2 rounded-lg border-none bg-transparent text-sm outline-none focus:outline-none"
                      aria-label="Type your message"
                    />
                    <Paperclip
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground cursor-pointer"
                      aria-label="Attach file"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-black dark:bg-indigo-500 text-white p-2 rounded-lg hover:opacity-90"
                    aria-label="Send message"
                  >
                    <SendHorizonal className="w-4 h-4" />
                  </button>
                </form>
                {/* Footer */}
                <footer className="text-xs text-center text-muted-foreground py-2 border-t border-border">
                  Powered by <strong>Konvo</strong>.
                </footer>
              </div>
            </div>
          </div>
        </CardItem>
      </CardContainer>
      {showNotice && !isLanding && (
        <aside
          className="mt-[-50px] relative flex items-start justify-between gap-1 bg-yellow-100 dark:bg-yellow-200/10 text-yellow-800 dark:text-yellow-300 text-xs leading-tight py-2 px-1 border border-border rounded-lg max-w-md w-full"
          role="alert"
        >
          <div className="flex gap-1">
            <span aria-hidden="true">⚠️</span>
            <span className="leading-tight tracking-tight">
              This is a demo chat panel for illustration purposes only. Messages are static and not
              interactive.
            </span>
          </div>
          <Button
            variant="ghost"
            size={null}
            onClick={handleCloseNotice}
            className="text-yellow-800 dark:text-yellow-500 hover:opacity-70"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </Button>
        </aside>
      )}
    </div>
  )
}

export default ChatBotPanel
