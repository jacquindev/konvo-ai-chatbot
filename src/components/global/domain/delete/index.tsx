"use client"

import ModalAlert, { ModalAlertFooter } from "@/components/global/modal-alert"
import { Button } from "@/components/ui/button"
import { useDomain } from "@/hooks/contexts/domain"
import { Loader2 } from "lucide-react"
import React, { useState } from "react"

type Props = {
  userId: string
  domainId: string
  trigger: React.ReactNode
}

const DeleteDomain = ({ userId, domainId, trigger }: Props) => {
  const { deletingDomain, onDeleteDomain } = useDomain()

  const [open, setOpen] = useState(false)

  const handleDelete = () => {
    onDeleteDomain(domainId, userId)
    setOpen(false)
  }

  return (
    <ModalAlert
      open={open}
      onOpenChange={setOpen}
      trigger={trigger}
      description="This action cannot be undone. This will permanently delete your domain and all its data from our server."
    >
      <ModalAlertFooter>
        <Button
          variant="destructive"
          className="text-white"
          onClick={handleDelete}
          disabled={deletingDomain}
        >
          {deletingDomain ? <Loader2 className="animate-spin" /> : "Delete"}
        </Button>
      </ModalAlertFooter>
    </ModalAlert>
  )
}

export default DeleteDomain
