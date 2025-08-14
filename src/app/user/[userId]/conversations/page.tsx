"use client"

import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"
import { PaperclipIcon, SendHorizonalIcon } from "lucide-react"

const ConversationsPage = () => {
  return (
    <div className="relative flex h-full w-full flex-col bg-transparent">
      <div className="flex-1 overflow-y-auto px-4 pt-6">
        <CardDescription className="mt-10 text-center opacity-70">
          No chats yet. Start the conversation below.
        </CardDescription>
      </div>

      <div className="bg-sidebar sticky bottom-0 z-10 w-full rounded-br-lg border-none backdrop-blur-lg">
        <form className="flex w-full items-start gap-3 px-4 py-3">
          {/* TODO: Build functional attachment button */}
          {/* TODO: Remove disabled attribute */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled
            className="text-muted-foreground hover:text-foreground place-self-center hover:cursor-pointer hover:bg-transparent disabled:opacity-50"
          >
            <PaperclipIcon className="h-5 w-5" />
          </Button>

          <input
            placeholder="Type a message..."
            className="border-input bg-background focus:ring-ring focus:border-ring placeholder:text-muted-foreground flex-1 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none disabled:opacity-50"
          />

          <Button
            type="submit"
            size="icon"
            className="dark:bg-primary bg-indigo-700 text-white hover:cursor-pointer dark:text-black"
          >
            <SendHorizonalIcon className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ConversationsPage
