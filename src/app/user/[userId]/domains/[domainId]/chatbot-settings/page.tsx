"use client"

import AppTooltip from "@/components/global/app-tooltip"
import { FormGenerator } from "@/components/global/form-generator"
import { TabsSection } from "@/components/global/tabs"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useChatbotSettings } from "@/hooks/contexts/chatbot"
import { useQueryCurrentDomain } from "@/hooks/queries"
import { Loader2 } from "lucide-react"
import { motion, Variants } from "motion/react"
import dynamic from "next/dynamic"
import { useParams } from "next/navigation"
import { FormProvider } from "react-hook-form"

const ChatBotColors = dynamic(
  () => import("@/components/global/chatbot").then(props => props.ChatBotColors),
  { ssr: false }
)
const ChatBotIcon = dynamic(
  () => import("@/components/global/chatbot").then(props => props.ChatBotIcon),
  { ssr: false }
)
const ChatBotPanel = dynamic(
  () => import("@/components/global/chatbot").then(props => props.ChatBotPanel),
  { ssr: false }
)

const motionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
}

const ChatbotSettingsPage = () => {
  const { userId, domainId } = useParams()

  const { register, errors, form, updatingChatbot, handleUpdateChatbot } = useChatbotSettings(
    domainId as string
  )

  const { data: domain } = useQueryCurrentDomain(domainId as string)
  const chatBot = domain?.data?.domain?.chatBot
  const plan = domain?.data?.subscription?.plan

  return (
    <FormProvider {...form}>
      <TabsSection
        title="Chatbot Settings"
        description="Customize your bot's appearance and greeting message."
      >
        <form className="space-y-10" onSubmit={handleUpdateChatbot}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-10">
              <motion.div variants={motionVariants}>
                <FormGenerator
                  register={register}
                  errors={errors}
                  name="welcomeMessage"
                  type="text"
                  inputType="textarea"
                  label="Greeting Message"
                  lines={3}
                  placeholder={chatBot?.welcomeMessage ?? ""}
                  defaultValue={chatBot?.welcomeMessage}
                />
              </motion.div>

              <motion.div variants={motionVariants}>
                <ChatBotColors
                  plan={plan ?? "STANDARD"}
                  upgradeLink={`/user/${userId}/settings/billing`}
                />
              </motion.div>
            </div>

            <motion.div variants={motionVariants}>
              <div className="lg:sticky lg:top-24 lg:self-start space-y-10">
                {chatBot && (
                  <>
                    <ChatBotIcon register={register} errors={errors} chatBot={chatBot} />
                    <div className="flex flex-col">
                      <div className="flex flex-row gap-2 z-10">
                        <Label>Chat Window Preview</Label>
                        <AppTooltip content="This is a preview of the chat window. It is not interactive and does not reflect the actual chatbot behavior." />
                      </div>
                      <div className="mt-[-50px]">
                        <ChatBotPanel />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div variants={motionVariants} className="flex justify-end">
            <Button type="submit" disabled={updatingChatbot}>
              {updatingChatbot ? (
                <>
                  <Loader2 className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Chatbot Settings"
              )}
            </Button>
          </motion.div>
        </form>
      </TabsSection>
    </FormProvider>
  )
}

export default ChatbotSettingsPage
