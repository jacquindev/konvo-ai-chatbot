import { onCreateHelpDeskQuestion } from "@/actions/chatbot"
import { useMutationData, useZodForm } from "@/hooks/shared"
import { HelpDeskSchema } from "@/schemas/chatbot.schema"
import { useRouter } from "next/navigation"
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

  return {
    register,
    errors,
    handleAddHelpDesk,
    addingHelpDesk,
  }
}
