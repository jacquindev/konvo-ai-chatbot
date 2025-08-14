import { onCreateFilterQuestion } from "@/actions/chatbot"
import { useMutationData, useZodForm } from "@/hooks/shared"
import { FilterQuestionsSchema } from "@/schemas/chatbot.schema"
import { useRouter } from "next/navigation"
import z from "zod"

export const useFilterQuestion = (domainId: string) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useZodForm(FilterQuestionsSchema)

  const router = useRouter()

  const { mutate: addFilterQuestion, isPending: addingFilterQuestion } = useMutationData(
    ["add-filter-question"],
    async (values: z.infer<typeof FilterQuestionsSchema>) => {
      return await onCreateFilterQuestion(domainId, values.question)
    },
    "domain-filter-question",
    () => {
      reset()
      router.refresh()
    }
  )

  const handleAddFilterQuestion = handleSubmit(values => addFilterQuestion(values))

  return {
    register,
    errors,
    handleAddFilterQuestion,
    addingFilterQuestion,
  }
}
