import { onUpdateUserAvatar, onUpdateUserName, onUpdateUserPassword } from "@/actions/auth"
import { useQueryCurrentUser } from "@/hooks/queries"
import { useMutationData, useZodForm } from "@/hooks/shared"
import { upload } from "@/lib/upload"
import { AccountSettingsSchema } from "@/schemas/account.schema"
import { useEffect, useMemo } from "react"
import z from "zod"

export const useAccountSettings = (userId: string) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useZodForm(AccountSettingsSchema, "onChange")

  const { data: userData } = useQueryCurrentUser(userId)

  const avatarWatch = watch("avatar")
  const avatarPreview = useMemo(() => {
    const file = avatarWatch?.[0]
    if (file instanceof File) {
      return URL.createObjectURL(file)
    }
    return userData?.avatar ?? ""
  }, [avatarWatch, userData?.avatar])

  useEffect(() => {
    let url: string | null = null
    if (avatarWatch?.[0] instanceof File) {
      url = URL.createObjectURL(avatarWatch[0])
    }
    return () => {
      if (url) {
        URL.revokeObjectURL(url)
      }
    }
  }, [avatarWatch])

  const { mutate: updateProfileSettings, isPending: updatingProfile } = useMutationData(
    ["update-profile"],
    async (values: z.infer<typeof AccountSettingsSchema>) => {
      if (values.avatar[0]) {
        const uploaded = await upload.uploadFile(values.avatar[0])
        const imageUrl = uploaded.cdnUrl
        await onUpdateUserAvatar(imageUrl)
      }

      if (values.firstName || values.lastName) {
        await onUpdateUserName(values.firstName, values.lastName)
      }
    },
    "user-account",
    () => reset()
  )

  const { mutate: updateUserPassword, isPending: updatingPassword } = useMutationData(
    ["update-password"],
    async ({ password }: { password: string }) => {
      return await onUpdateUserPassword(password)
    },
    "user-account",
    () => reset()
  )

  const handleSubmitProfile = handleSubmit(values => {
    updateProfileSettings(values)
  })

  const handleSubmitPassword = handleSubmit(values => {
    if (!values.password) return
    updateUserPassword({ password: values.password })
  })

  return {
    register,
    errors,
    avatarPreview,
    userData,
    updatingProfile,
    handleSubmitProfile,
    updatingPassword,
    handleSubmitPassword,
  }
}
