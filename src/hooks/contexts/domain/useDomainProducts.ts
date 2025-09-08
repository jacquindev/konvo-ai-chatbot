import { onCreateDomainProduct } from "@/actions/domain"
import { useMutationData, useZodForm } from "@/hooks/shared"
import { upload } from "@/lib/upload"
import { DomainProductSchema } from "@/schemas/domain.schema"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import z from "zod"

export const useDomainProducts = (domainId: string) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useZodForm(DomainProductSchema)

  const router = useRouter()

  const { mutate: createProduct, isPending: creatingProduct } = useMutationData(
    ["add-product"],
    async (values: z.infer<typeof DomainProductSchema>) => {
      const uploaded = await upload.uploadFile(values.image[0])
      return await onCreateDomainProduct(domainId, values.name, uploaded.uuid, values.price)
    },
    "domain-products",
    () => {
      ;(reset(), router.refresh())
    }
  )

  const onCreateProduct = useCallback(
    async (e?: React.BaseSyntheticEvent): Promise<{ success: boolean }> => {
      let success = false

      await handleSubmit(
        values =>
          new Promise<void>(resolve => {
            createProduct(values, {
              onSuccess: res => {
                success = res?.status === 200
                resolve()
              },
              onError: () => resolve(),
            })
          })
      )(e)

      return { success }
    },
    [createProduct, handleSubmit]
  )

  return {
    register,
    errors,
    onCreateProduct,
    creatingProduct,
  }
}
