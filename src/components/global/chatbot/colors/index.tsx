"use client"

import ColorPicker from "@/components/global/color-picker"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SubscriptionPlanEnum } from "@prisma/client"
import { X } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

type Props = {
  plan: SubscriptionPlanEnum
  upgradeLink: string
}

const ChatBotColors = ({ plan, upgradeLink }: Props) => {
  const { watch, setValue } = useFormContext()

  const [showNotice, setShowNotice] = useState(true)

  switch (plan) {
    case "PREMIUM":
    case "UNLIMITED":
      return (
        <div className="flex flex-col gap-4 space-y-10">
          <Card className="shadow-none border-none bg-transparent p-0 flex flex-col">
            <CardContent className="p-0">
              <ColorPicker
                label="Background"
                description="Pick a background color for your chatbot trigger."
                value={watch("background")}
                onValueChangeAction={val => setValue("background", val, { shouldDirty: true })}
              />
            </CardContent>
          </Card>

          <Card className="shadow-none border-none bg-transparent p-0 flex flex-col">
            <CardContent className="p-0">
              <ColorPicker
                label="Bubble Color"
                description="Pick a color for your chatbot's bubbles."
                value={watch("textColor")}
                onValueChangeAction={val => setValue("textColor", val, { shouldDirty: true })}
              />
            </CardContent>
          </Card>
        </div>
      )
    case "STANDARD":
    default:
      return (
        showNotice && (
          <motion.div
            className="max-w-xl rounded-lg border border-dashed border-yellow-400 bg-yellow-500/10 p-4 relative flex items-start justify-between gap-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <div>
              Chatbot colors customization is only available on{" "}
              <span className="font-bold text-lg">Premium</span> and{" "}
              <span className="font-bold text-lg">Unlimited</span> plans.{" "}
              <Link
                href={upgradeLink}
                className="font-bold text-primary hover:underline underline-offset-2 ml-1"
              >
                Upgrade now
              </Link>{" "}
              to take full control of your bot&apos;s look and feel.
            </div>
            <Button
              variant="ghost"
              size={null}
              onClick={() => setShowNotice(false)}
              className="text-yellow-800 dark:text-yellow-500 hover:opacity-70"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        )
      )
  }
}

export default ChatBotColors
