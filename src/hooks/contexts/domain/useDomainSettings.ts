import { onUpdateDomainName } from "@/actions/domain"
import { useMutationData, useZodForm } from "@/hooks/shared"
import { DomainNameSchema } from "@/schemas/domain.schema"
import z from "zod"

export const useDomainSettings = (domainId: string) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useZodForm(DomainNameSchema)

  const { mutate: updateDomainName, isPending: updatingDomainName } = useMutationData(
    ["update-domain"],
    async (values: z.infer<typeof DomainNameSchema>) => {
      if (values.domain) {
        return await onUpdateDomainName(domainId, values.domain)
      }
    },
    "user-domain",
    () => reset()
  )

  const handleSubmitDomainName = handleSubmit(values => {
    updateDomainName(values)
  })

  return {
    register,
    errors,
    updatingDomainName,
    handleSubmitDomainName,
  }
}
