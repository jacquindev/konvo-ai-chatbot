import { onCreateFilterQuestion, onDeleteFilterQuestion } from "@/actions/chatbot"
import { useMutationData, useZodForm } from "@/hooks/shared"
import { FilterQuestionsSchema } from "@/schemas/chatbot.schema"
import { useRouter } from "next/navigation"
import { useState } from "react"
import z, { multipleOf } from "zod"

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
    "domain-filter-questions",
    () => {
      reset()
      router.refresh()
    }
  )

  const handleAddFilterQuestion = handleSubmit(values => addFilterQuestion(values))

  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { mutate: deleteFilterQuestion } = useMutationData(
    ["delete-filter-question"],
    async (id: string) => {
      setDeletingId(id)
      return await onDeleteFilterQuestion(id)
    },
    "domain-filter-questions",
    () => {
      setDeletingId(null)
      router.refresh()
    }
  )

  return {
    register,
    errors,
    handleAddFilterQuestion,
    addingFilterQuestion,
    deletingId,
    deleteFilterQuestion,
  }
}
