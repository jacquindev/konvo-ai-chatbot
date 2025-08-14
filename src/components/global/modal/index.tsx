import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import React from "react"

type Props = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger: React.ReactNode
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

const Modal = ({ open, onOpenChange, trigger, title, description, children, className }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="dark:bg-card/60 backdrop-blur-lg sm:max-w-md bg-sidebar/90">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className={cn("mt-5", className)}>{children}</div>
      </DialogContent>
    </Dialog>
  )
}

export const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between mt-8 gap-4">
      <DialogClose asChild>
        <Button variant="outline" className="cursor-pointer">
          Cancel
        </Button>
      </DialogClose>

      {children}
    </div>
  )
}

export default Modal
