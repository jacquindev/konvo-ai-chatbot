import { onUpdateChatbotSettings } from "@/actions/chatbot"
import { useMutationData, useZodForm } from "@/hooks/shared"
import { upload } from "@/lib/upload"
import { ChatbotSettingsSchema } from "@/schemas/chatbot.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"

export const useChatbotSettings = (domainId: string) => {
  const form = useForm<z.infer<typeof ChatbotSettingsSchema>>({
    resolver: zodResolver(ChatbotSettingsSchema),
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = form

  const { mutate: updateChatbot, isPending: updatingChatbot } = useMutationData(
    ["update-chatbot"],
    async (values: z.infer<typeof ChatbotSettingsSchema>) => {
      if (values.icon[0]) {
        const uploaded = await upload.uploadFile(values.icon[0])
        await onUpdateChatbotSettings(domainId, { field: "icon", value: uploaded.uuid })
      }
      if (values.welcomeMessage) {
        await onUpdateChatbotSettings(domainId, {
          field: "welcomeMessage",
          value: values.welcomeMessage,
        })
      }
      if (values.botBackground) {
        await onUpdateChatbotSettings(domainId, {
          field: "botBackground",
          value: values.botBackground,
        })
      }
      if (values.bubbleColor) {
        await onUpdateChatbotSettings(domainId, { field: "bubbleColor", value: values.bubbleColor })
      }
      if (values.textColor) {
        await onUpdateChatbotSettings(domainId, { field: "textColor", value: values.textColor })
      }
      if (values.theme) {
        await onUpdateChatbotSettings(domainId, { field: "theme", value: values.theme })
      }
    },
    "user-domain",
    () => reset({}, { keepDirtyValues: true })
  )

  const handleUpdateChatbot = handleSubmit(values => updateChatbot(values))

  return {
    form,
    register,
    errors,
    handleUpdateChatbot,
    updatingChatbot,
  }
}
