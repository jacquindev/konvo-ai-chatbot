import { onCreateNewCampaign } from "@/actions/marketing"
import { useMutationData, useZodForm } from "@/hooks/shared"
import { AddCampaignSchema } from "@/schemas/campaign.schema"
import { useRouter } from "next/navigation"
import z from "zod"

export const useEmailMarketing = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useZodForm(AddCampaignSchema, "onChange")

  const router = useRouter()

  const { mutate: addCampaign, isPending: addingCampaign } = useMutationData(
    ["add-campaign"],
    async (values: z.infer<typeof AddCampaignSchema>) => {
      return await onCreateNewCampaign({
        name: values.name,
        description: values.description,
        message: JSON.stringify(values.template),
        customers: values.customers,
      })
    },
    "user-campaigns",
    () => {
      reset()
      router.refresh()
    }
  )

  const handleSubmitCampaign = handleSubmit(values => addCampaign(values))

  return {
    register,
    errors,
    handleSubmitCampaign,
    addingCampaign,
  }
}
