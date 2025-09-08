import { onCreateHelpDeskQuestion, onDeleteHelpDeskQuestion } from "@/actions/chatbot"
import { useMutationData, useZodForm } from "@/hooks/shared"
import { HelpDeskSchema } from "@/schemas/chatbot.schema"
import { useRouter } from "next/navigation"
import { useState } from "react"
import z from "zod"

export const useHelpDesk = (domainId: string) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useZodForm(HelpDeskSchema)

  const router = useRouter()

  const { mutate: addHelpDesk, isPending: addingHelpDesk } = useMutationData(
    ["add-helpdesk"],
    async (values: z.infer<typeof HelpDeskSchema>) => {
      return await onCreateHelpDeskQuestion(domainId, values.question, values.answer)
    },
    "domain-helpdesk",
    () => {
      reset()
      router.refresh()
    }
  )

  const handleAddHelpDesk = handleSubmit(values => addHelpDesk(values))

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { mutate: deleteHelpDesk } = useMutationData(
    ["delete-helpdesk"],
    async (id: string) => {
      setDeletingId(id)
      return await onDeleteHelpDeskQuestion(id)
    },
    "domain-helpdesk",
    () => {
      setDeletingId(null)
      router.refresh()
    }
  )

  return {
    register,
    errors,
    handleAddHelpDesk,
    addingHelpDesk,
    deletingId,
    deleteHelpDesk,
  }
}
