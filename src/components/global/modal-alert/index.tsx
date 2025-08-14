import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import React from "react"

type Props = {
  trigger: React.ReactNode
  title?: string
  description?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const ModalAlert = ({
  trigger,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently remove all your data from our servers.",
  open,
  onOpenChange,
  children,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-card/70 bg-sidebar/90 backdrop-blur-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}

export const ModalAlertFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <AlertDialogCancel asChild>
        <Button variant="outline" className="cursor-pointer">
          Cancel
        </Button>
      </AlertDialogCancel>
      {children}
    </div>
  )
}

export default ModalAlert
