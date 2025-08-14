import { onIntegrateDomain, onRemoveDomain } from "@/actions/domain"
import { useBreadcrumbs } from "@/hooks/navigation"
import { useMutationData, useMutationDataState, useZodForm } from "@/hooks/shared"
import { upload } from "@/lib/upload"
import { AddDomainSchema } from "@/schemas/domain.schema"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import z from "zod"

export const useDomain = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useZodForm(AddDomainSchema)

  const router = useRouter()
  const { page: currentDomainId } = useBreadcrumbs()

  // ADD DOMAIN MUTATION
  const { mutate: addDomain, isPending: addingDomain } = useMutationData(
    ["add-domain"],
    async (values: z.infer<typeof AddDomainSchema>) => {
      const uploaded = await upload.uploadFile(values.image[0])
      return await onIntegrateDomain(values.domain, uploaded.uuid)
    },
    "user-domains",
    () => {
      reset()
      router.refresh()
    }
  )

  // OPTIMISTIC UI STATE FOR ADDING DOMAIN
  const { latestVariables: latestAddDomain } = useMutationDataState(["add-domain"])

  const onAddDomain = useCallback(
    async (e?: React.BaseSyntheticEvent): Promise<{ success: boolean }> => {
      let success = false

      await handleSubmit(
        values =>
          new Promise<void>(resolve => {
            addDomain(values, {
              onSuccess: res => {
                success = res?.status === 201
                resolve()
              },
              onError: () => resolve(),
            })
          })
      )(e)

      return { success }
    },
    [addDomain, handleSubmit]
  )

  // DELETE DOMAIN MUTATION
  const { mutate: deleteDomain, isPending: deletingDomain } = useMutationData(
    ["delete-domain"],
    async (domainId: string) => await onRemoveDomain(domainId),
    "user-domains",
    () => {
      router.refresh()
    }
  )

  // OPTIMISTIC UI STATE FOR DELETING DOMAIN
  const { latestVariables: latestDeleteDomain } = useMutationDataState(["delete-domain"])

  const onDeleteDomain = useCallback(
    async (domainId: string, userId: string) => {
      await deleteDomain(domainId)
      if (currentDomainId === domainId) {
        router.back()

        setTimeout(() => {
          router.push(`/user/${userId}/domains`)
        }, 500)
      }
    },
    [deleteDomain, currentDomainId, router]
  )

  return {
    register,
    errors,
    handleSubmit,
    currentDomainId,
    addingDomain,
    onAddDomain,
    deletingDomain,
    onDeleteDomain,
    latestAddDomain,
    latestDeleteDomain,
  }
}
