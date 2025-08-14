"use client"

import { ChatBotFilterQuestions, ChatBotHelpDesk } from "@/components/global/chatbot"
import { TabsMenu, TabsSection } from "@/components/global/tabs"
import { Help, Question } from "@/components/icons"
import { TabsContent } from "@/components/ui/tabs"
import { useParams } from "next/navigation"

const BotTrainingPage = () => {
  const { domainId } = useParams()

  const triggers = [
    { label: "help desk", icon: Help },
    { label: "questions", icon: Question },
  ]

  return (
    <TabsSection
      title="Bot Training"
      description="Set FAQs, create questions for capturing leads, and guide your chatbot's behavior."
    >
      <TabsMenu triggers={triggers} className="w-full">
        <TabsContent value="help desk">
          <ChatBotHelpDesk domainId={domainId as string} />
        </TabsContent>

        <TabsContent value="questions">
          <ChatBotFilterQuestions />
        </TabsContent>
      </TabsMenu>
    </TabsSection>
  )
}

export default BotTrainingPage
