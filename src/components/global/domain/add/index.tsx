"use client"

import AppButton from "@/components/global/app-button"
import { FormGenerator } from "@/components/global/form-generator"
import Modal, { ModalFooter } from "@/components/global/modal"
import UploadWidget from "@/components/global/upload-widget"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useDomain } from "@/hooks/contexts/domain"
import { useCollapsedSidebar, useIsMobile } from "@/hooks/ui"
import { cn } from "@/lib/utils"
import { Loader2, Plus } from "lucide-react"
import { motion } from "motion/react"
import { useCallback, useState } from "react"

type Props = {
  className?: string
  isPage?: boolean
  size?: "default" | "sm" | "lg" | "icon"
  variant?: "outline" | "ghost" | "default" | "secondary"
  animated?: boolean
}

const AddDomain = ({
  className,
  isPage = false,
  size = "sm",
  variant = "outline",
  animated = false,
}: Props) => {
  const isMobile = useIsMobile()
  const isCollapsed = useCollapsedSidebar()

  const [open, setOpen] = useState(false)

  const { register, errors, handleSubmit, addingDomain, onAddDomain } = useDomain()

  const onSubmit = useCallback(
    async (formValues: any) => {
      const result = await onAddDomain(formValues)
      if (result?.success) setOpen(false)
    },
    [onAddDomain]
  )

  const renderTrigger = () => {
    const showLabel = isPage || !isCollapsed || isMobile

    return (
      <AppButton
        size={size}
        variant={variant}
        className={cn("flex w-full cursor-pointer items-center justify-center gap-2", className)}
      >
        <Plus className="h-4 w-4" />
        {showLabel && <span>Add Domain</span>}
      </AppButton>
    )
  }

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Add a domain"
      description="Add a domain to your account to start integrating with your chatbot."
      trigger={
        animated ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            {renderTrigger()}
          </motion.div>
        ) : (
          renderTrigger()
        )
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormGenerator
          register={register}
          errors={errors}
          inputType="input"
          type="text"
          name="domain"
          label="Domain"
          placeholder="mydomain.com"
        />

        <div className="space-y-1">
          <Label htmlFor="domain-icon">Icon</Label>
          <UploadWidget
            id="domain-icon"
            register={register}
            errors={errors}
            label="Upload Icon"
            uploading={addingDomain}
          />
        </div>

        <ModalFooter>
          <Button type="submit" disabled={addingDomain}>
            {addingDomain ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default AddDomain
